import config from '@core/config'
import { ChannelType } from '@core/constants'
import { UploadService } from '@core/services'
import { EmailTemplateService } from '@email/services'
import { SmsTemplateService } from '@sms/services'
import { TelegramTemplateService } from '@telegram/services'
import { loggerWithLabel } from '@core/logger'
import { EmailTemplate } from '@email/models'
import { UploadData } from '@core/interfaces'
import { SmsTemplate } from '@sms/models'
import { TelegramTemplate } from '@telegram/models'

import trace from 'dd-trace'
import { GovsgTemplateService } from '@govsg/services'
import { GovsgTemplate } from '@govsg/models/govsg-template'

const logger = loggerWithLabel(module)
enum QueueEvent {
  FAILED = 'job failed',
  STALLED = 'stalled',
}

const checkStalledJobsCallback = (err: Error, numStalled: number): void => {
  if (err) {
    return logger.error({
      message:
        'Error encountered while checking for stalled jobs in upload queue',
      error: err,
    })
  }

  if (numStalled > 0) {
    logger.info({
      message: `Checked for stalled jobs in upload queue and found ${numStalled} stalled jobs.`,
    })
  }
}

const initUploadQueue = async (): Promise<void> => {
  const uploadQueue = await UploadService.getUploadQueue()

  uploadQueue.process(
    config.get('upload.concurrency'),
    trace.wrap(
      'upload-queue',
      { tags: { resource_name: 'process' } },
      async (job): Promise<void> => {
        const { channelType, data, protect } = job.data

        switch (channelType) {
          case ChannelType.Email:
            return protect
              ? EmailTemplateService.processProtectedUpload(
                  data as UploadData<EmailTemplate>
                )
              : EmailTemplateService.processUpload(
                  data as UploadData<EmailTemplate>
                )

          case ChannelType.SMS:
            return SmsTemplateService.processUpload(
              data as UploadData<SmsTemplate>
            )

          case ChannelType.Telegram:
            return TelegramTemplateService.processUpload(
              data as UploadData<TelegramTemplate>
            )
          case ChannelType.Govsg:
            return GovsgTemplateService.processUpload(
              data as UploadData<GovsgTemplate>
            )
        }
      }
    )
  )

  uploadQueue.on(QueueEvent.FAILED, UploadService.handleFailedUpload)
  uploadQueue.on(QueueEvent.STALLED, UploadService.handleStalledUpload)

  uploadQueue.checkStalledJobs(
    config.get('upload.checkStalledInterval'),
    checkStalledJobsCallback
  )
}

export default initUploadQueue
