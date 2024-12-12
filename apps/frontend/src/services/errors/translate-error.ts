import { ErrorMessage } from '@ketero/utils';

export const translateError = (error: ErrorMessage) => {
  switch (error) {
    case ErrorMessage.InvalidCredentials: {
      return "It doesn't look like a user exists with the credentials you provided.";
    }
    case ErrorMessage.UserAlreadyExists: {
      return 'A user with this email address and/or username already exists.';
    }
    case ErrorMessage.SecretsNotFound: {
      return "User does not have an associated 'secrets' record. Please report this issue on GitHub.";
    }
    case ErrorMessage.OAuthUser: {
      return 'This email address is associated with an OAuth account. Please sign in with your OAuth provider.';
    }
    case ErrorMessage.InvalidResetToken: {
      return 'It looks like the reset token you provided is invalid. Please try restarting the password reset process again.';
    }
    case ErrorMessage.InvalidVerificationToken: {
      return 'It looks like the verification token you provided is invalid. Please try restarting the verification process again.';
    }
    case ErrorMessage.EmailAlreadyVerified: {
      return 'It looks like your email address has already been verified.';
    }
    case ErrorMessage.TwoFactorNotEnabled: {
      return 'Two-factor authentication is not enabled for this account.';
    }
    case ErrorMessage.TwoFactorAlreadyEnabled: {
      return 'Two-factor authentication is already enabled for this account.';
    }
    case ErrorMessage.InvalidTwoFactorCode: {
      return 'It looks like the two-factor authentication code you provided is invalid. Please try again.';
    }
    case ErrorMessage.InvalidTwoFactorBackupCode: {
      return 'It looks like the backup code you provided is invalid or used. Please try again.';
    }
    case ErrorMessage.InvalidBrowserConnection: {
      return "There was an error connecting to the browser. Please make sure 'chrome' is running and reachable.";
    }
    case ErrorMessage.ResumeSlugAlreadyExists: {
      return 'A resume with this slug already exists, please pick a different unique identifier.';
    }
    case ErrorMessage.ResumeNotFound: {
      return "It looks like the resume you're looking for doesn't exist.";
    }
    case ErrorMessage.ResumeLocked: {
      return 'The resume you want to update is locked, please unlock if you wish to make any changes to it.';
    }
    case ErrorMessage.ResumePrinterError: {
      return 'Something went wrong while printing your resume. Please try again later or raise an issue on GitHub.';
    }
    case ErrorMessage.ResumePreviewError: {
      return 'Something went wrong while grabbing a preview your resume. Please try again later or raise an issue on GitHub.';
    }
    case ErrorMessage.SomethingWentWrong: {
      return 'Something went wrong while processing your request. Please try again later or raise an issue on GitHub.';
    }

    default: {
      return error;
    }
  }
};
