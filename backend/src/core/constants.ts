export enum ChannelType {
  SMS = 'SMS',
  Email = 'EMAIL'
}

export enum JobStatus {
  Ready = 'READY',
  Enqueued = 'ENQUEUED',
  Sending = 'SENDING',
  Sent = 'SENT',
  Stopped = 'STOPPED',
  Logged = 'LOGGED'
}

/**
 * @swagger
 *  components:
 *    schemas:
 *      ChannelType:
 *        type: string
 *        enum:
 *        - SMS
 *        - EMAIL
 *
 *      Project:
 *        type: object
 *
 *      ProjectMeta:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *          createdAt:
 *            type: string
 *            format: date-time
 *          status:
 *            type: string
 *          type:
 *            $ref: '#/components/schemas/ChannelType'
 *      JobStatus:
 *        type: string
 *        enum:
 *        - READY
 *        - ENQUEUED
 *        - SENDING
 *        - SENT
 *        - STOPPED
 *        - LOGGED
 */

