import React from 'react';
import { PrivacyPolicy } from './PrivacyPolicy';
import { TermsAndConditions } from './TermsAndConditions';

export default function TermsPrivacy() {
  return (
    <div className="mt-4 text-center text-sm text-gray-600">
      Read our <PrivacyPolicy />. Tap "Agree and Continue" to accept the{' '}
      <TermsAndConditions />.
    </div>
  );
}
