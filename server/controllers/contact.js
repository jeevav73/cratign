const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;
const allowedAttachmentTypes = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'image/jpeg',
  'image/png',
  'image/webp',
]);

export function createContactController(store) {
  return {
    async create(req, res, next) {
      try {
        let attachmentName = '';
        let attachmentPath = '';
        const attachment = req.body.attachment;
        if (attachment) {
          if (
            typeof attachment.name !== 'string' ||
            typeof attachment.type !== 'string' ||
            typeof attachment.data !== 'string' ||
            !allowedAttachmentTypes.has(attachment.type)
          ) {
            return res.status(400).json({
              success: false,
              error: 'Unsupported attachment type.',
            });
          }
          const base64Data = attachment.data.replace(/^data:[^;]+;base64,/, '');
          const fileBuffer = Buffer.from(base64Data, 'base64');
          if (fileBuffer.length > MAX_ATTACHMENT_BYTES) {
            return res.status(400).json({ success: false, error: 'Attachment must be 10 MB or smaller.' });
          }
          const safeName = attachment.name.replace(/[^a-zA-Z0-9._-]/g, '_');
          const key = `contacts/${Date.now()}-${safeName}`;
          attachmentName = attachment.name;
          const { uploadAttachment } = await import('../services/s3.js');
          attachmentPath = await uploadAttachment({
            body: fileBuffer,
            contentType: attachment.type,
            key,
            originalName: attachment.name,
          });
        }
        const data = await store.createContact({
          ...req.body,
          attachmentName,
          attachmentPath,
        });
        res.status(201).json({
          success: true,
          message: 'Thanks — we will be in touch shortly.',
          data: { id: data.id || data._id },
        });
      } catch (error) {
        next(error);
      }
    },
  };
}
