import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';


const TermsAndConditions = () => {

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };
  return (
    <>
      <Navbar />

      <div className="p-8 max-w-4xl mx-auto bg-white shadow-xl rounded-lg">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Terms and Conditions</h1>
        <p className="text-sm text-gray-500 mb-10 text-center">
          <strong>Last Updated: Sep 7, 2024</strong>
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Acceptance of Terms</h2>
          <p className="mb-6 text-gray-700 leading-relaxed">
            By accessing and using our to-do application, you agree to be bound by these Terms and Conditions.
            If you do not agree with these terms, please do not use the application. These Terms constitute a legal agreement
            between you User and BLACKASH, governing your use of the application and its services.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. User Responsibilities</h2>
          <p className="mb-4 text-gray-700 leading-relaxed">
            <strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials
            and for any activities that occur under your account. You agree to notify us immediately of any unauthorized use of your
            account or any other breach of security. We will not be liable for any loss or damage arising from your failure to comply
            with this responsibility.
          </p>
          <p className="mb-4 text-gray-700 leading-relaxed">
            <strong>User Content:</strong> You are solely responsible for all tasks, notes, and other content that you create, store,
            or share within the application. You agree not to use the application for any unlawful, harmful, or prohibited activities,
            including but not limited to posting content that is offensive, defamatory, or infringes upon the rights of others.
          </p>
          <p className="mb-6 text-gray-700 leading-relaxed">
            <strong>Prohibited Uses:</strong> You agree not to engage in any of the following prohibited activities:
            <ul className="list-disc list-inside mt-2">
              <li>Attempting to interfere with the proper functioning of the application.</li>
              <li>Engaging in activities that could harm, damage, or impair the application or its users.</li>
              <li>Using the application to distribute malware, spyware, or other malicious software.</li>
              <li>Engaging in fraudulent, illegal, or unauthorized activities.</li>
            </ul>
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. Privacy</h2>
          <p className="mb-6 text-gray-700 leading-relaxed">
            We respect your privacy and are committed to protecting your personal data. Please refer to our Privacy Policy
            for more details on how we collect, use, and protect your information. By using the application, you consent to
            the collection and use of your information as described in the Privacy Policy.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Intellectual Property</h2>
          <p className="mb-6 text-gray-700 leading-relaxed">
            All content and materials within the application, including but not limited to text, graphics, logos, and software,
            are the property of BLACKASH and are protected by applicable intellectual property laws. You may not use,
            modify, copy, distribute, or create derivative works based on any content from the application without prior written consent.
          </p>
          <p className="mb-6 text-gray-700 leading-relaxed">
            You are granted a limited, non-exclusive, and non-transferable license to access and use the application for personal,
            non-commercial purposes, provided that you comply with these Terms.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Limitation of Liability</h2>
          <p className="mb-6 text-gray-700 leading-relaxed">
            We strive to ensure the accuracy, completeness, and reliability of the application, but we do not guarantee that it will
            be error-free or uninterrupted. The application is provided "as is" and "as available," without any warranties of any kind,
            either express or implied.
          </p>
          <p className="mb-6 text-gray-700 leading-relaxed">
            In no event shall BLACKASH, its directors, employees, or agents be liable for any direct, indirect, incidental,
            consequential, or punitive damages arising out of your use or inability to use the application, even if we have been advised
            of the possibility of such damages.
          </p>
          <p className="mb-6 text-gray-700 leading-relaxed">
            Your sole remedy for dissatisfaction with the application is to stop using it.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Modifications to Terms</h2>
          <p className="mb-6 text-gray-700 leading-relaxed">
            We reserve the right to modify these Terms at any time at our sole discretion. Any changes will be effective immediately
            upon posting on the application. It is your responsibility to review these Terms periodically for any updates or changes.
            Your continued use of the application after any modifications indicates your acceptance of the revised Terms.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">7. Governing Law and Dispute Resolution</h2>
          <p className="mb-6 text-gray-700 leading-relaxed">
            These Terms and Conditions are governed by and construed in accordance with the laws of India, without
            regard to its conflict of law principles. Any disputes arising out of or in connection with these Terms shall be resolved
            through amicable negotiation. If the parties are unable to reach an agreement, the dispute shall be submitted to the
            exclusive jurisdiction of the courts in India.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">8. Termination</h2>
          <p className="mb-6 text-gray-700 leading-relaxed">
            We reserve the right to suspend or terminate your access to the application at any time, with or without cause, and without
            prior notice. Upon termination, all provisions of these Terms that by their nature should survive termination shall survive,
            including but not limited to ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">9. Contact Information</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions or concerns about these Terms and Conditions, or if you need to report a violation of these Terms,
            please contact us at "blachash.githuh@gmail.com" . We value your feedback and are committed to addressing any concerns you may have.
          </p>
        </section>
        <button onClick={handleBackClick} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Go Back</button>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
