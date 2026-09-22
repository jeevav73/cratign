const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(req, res, next) {
  const { name, email, company, message } = req.body ?? {};
  const errors = {};

  if (typeof name !== 'string' || name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  } else if (name.trim().length > 80) {
    errors.name = 'Name must be 80 characters or fewer.';
  }

  if (typeof email !== 'string' || !emailPattern.test(email.trim())) {
    errors.email = 'A valid email address is required.';
  }

  if (company != null && typeof company !== 'string') {
    errors.company = 'Company must be a string.';
  } else if (typeof company === 'string' && company.length > 100) {
    errors.company = 'Company must be 100 characters or fewer.';
  }

  if (typeof message !== 'string' || message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  } else if (message.trim().length > 2000) {
    errors.message = 'Message must be 2000 characters or fewer.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed.',
      fields: errors,
    });
  }

  req.body = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    company: typeof company === 'string' ? company.trim() : '',
    message: message.trim(),
  };

  next();
}

export function notFound(req, res) {
  res.status(404).json({ success: false, error: 'Not found.' });
}

export function errorHandler(err, req, res, next) {
  console.error(err);
  if (res.headersSent) {
    next(err);
    return;
  }
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error.',
  });
}
