import validator from 'validator';

class ValidationService {
  // Validate Email
  static validateEmail(email) {
    if (!email) {
      throw new Error('Email is required');
    }
    
    if (!validator.isEmail(email)) {
      throw new Error('Invalid email format');
    }
    
    return true;
  }

  // Validate Password
  static validatePassword(password) {
    if (!password) {
      throw new Error('Password is required');
    }
    
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
    
    if (!/(?=.*[A-Z])/.test(password)) {
      throw new Error('Password must contain at least one uppercase letter');
    }
    
    if (!/(?=.*[a-z])/.test(password)) {
      throw new Error('Password must contain at least one lowercase letter');
    }
    
    if (!/(?=.*\d)/.test(password)) {
      throw new Error('Password must contain at least one number');
    }
    
    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      throw new Error('Password must contain at least one special character');
    }
    
    return true;
  }

  // Validate Username
  static validateUsername(username) {
    if (!username) {
      throw new Error('Username is required');
    }
    
    if (username.length < 3) {
      throw new Error('Username must be at least 3 characters long');
    }
    
    if (username.length > 20) {
      throw new Error('Username must be less than 20 characters');
    }
    
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      throw new Error('Username can only contain letters, numbers, and underscores');
    }
    
    return true;
  }

  // Validate Phone Number
  static validatePhoneNumber(phone) {
    if (!phone) {
      throw new Error('Phone number is required');
    }
    
    if (!validator.isMobilePhone(phone, 'any')) {
      throw new Error('Invalid phone number format');
    }
    
    return true;
  }

  // Validate URL
  static validateURL(url) {
    if (!url) {
      throw new Error('URL is required');
    }
    
    if (!validator.isURL(url)) {
      throw new Error('Invalid URL format');
    }
    
    return true;
  }

  // Validate Date
  static validateDate(date) {
    if (!date) {
      throw new Error('Date is required');
    }
    
    if (!validator.isDate(date)) {
      throw new Error('Invalid date format');
    }
    
    return true;
  }

  // Sanitize Input
  static sanitizeInput(input) {
    return validator.escape(input.trim());
  }

  // Comprehensive Validation Method
  static validateRegistrationData(data) {
    const { email, password, username } = data;
    
    this.validateEmail(email);
    this.validatePassword(password);
    this.validateUsername(username);
    
    return true;
  }

  // Custom Validation Method
  static customValidation(value, validationRules) {
    const errors = [];

    validationRules.forEach(rule => {
      try {
        rule(value);
      } catch (error) {
        errors.push(error.message);
      }
    });

    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }

    return true;
  }
}

export default ValidationService;