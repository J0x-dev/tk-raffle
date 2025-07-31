import React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '../../components/ui/scroll-area';
import { X } from 'lucide-react';

export function PrivacyPolicy() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="h-auto p-0 text-[#8a2a2b] underline">
          Privacy Policy
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-full max-h-[80vh] max-w-4xl flex-col border-none p-5 sm:p-8 text-[#111]">
        <DialogHeader>
          <DialogTitle>Privacy Policy</DialogTitle>
          <DialogDescription>Our Privacy commitment</DialogDescription>
        </DialogHeader>
        <ScrollArea className="-mx-6 h-full pr-4 sm:-mx-8">
          <div className="px-6 pb-6 text-left text-sm sm:px-8 font-inter">
            <p>
              TAPA KING, INC. (Tapa King) is committed to protecting and
              safeguarding your privacy when you visit and access our website
              using any electronic device. This Privacy Policy set forth how we
              collect, use, and store your information.
            </p>
            <p className="mt-4">
              This Policy applies to information shared and collected from
              visitors of Tapa King’s official website. It is not applicable to
              any information collected offline or via channels other than this
              website.
            </p>
            <h3 className="mt-4 font-bold">Information we collect</h3>
            <p>
              In order to facilitate your transaction, request, or access to our
              products or services, there will be instances when we will be
              requesting you to provide Personal Data, such as your:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Full name;</li>
              <li>Age;</li>
              <li>Residential, postal, or billing addresses;</li>
              <li>Email addresses;</li>
              <li>Mobile and/or landline numbers;</li>
              <li>Gender;</li>
              <li>Marital status;</li>
              <li>Proof of identification;</li>
              <li>
                Contents of a message and/or attachments (documents or pictures)
                voluntarily submitted by you;
              </li>
              <li>Information you choose to voluntarily provide; and</li>
              <li>
                Any other information material to the product/s or service/s
                that you are availing or when it is necessary under the laws.
              </li>
            </ul>
            <h3 className="mt-4 font-bold">Consent</h3>
            <p>
              By using our website and providing us your Personal Data to avail
              our products and services or in any transaction with us where your
              Personal Data is required, you are consenting to the collection,
              use, access, transfer, storage, and processing of your Personal
              Data as described in this Privacy Policy. Thus, we encourage you
              to READ our Privacy Policy.
            </p>
            <h3 className="mt-4 font-bold">How we collect information</h3>
            <p>
              We collect Personal Data and other information through (i)
              automated means; (ii) by providing it to us, and those that we
              gathered from other sources.
            </p>
            <h3 className="mt-4 font-bold">Use and sharing of information</h3>
            <p>
              We use the information we collect in various ways, including the
              following purposes:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                Carry out your requests, fulfilling orders, processing payments,
                and providing delivery services;
              </li>
              <li>
                Allow you access to our online services that require your
                Personal Data;
              </li>
              <li>Improve our services;</li>
              <li>Any other purposes for which you have permitted; and</li>
              <li>
                Comply with any applicable laws or rules and regulations or
                investigative proceedings.
              </li>
            </ul>
            <div className="space-y-4 mt-4">
              <p>
                We do not sell your Personal Data and only share your information
                as described in this Privacy Policy.
              </p>
              <p>
                Tapa King may share Personal Data to its subsidiaries, affiliates,
                and franchisees, which may be situated outside of the Philippines,
                on a need-to-know basis. Use of your information by these entities
                will comply with this Privacy Policy.
              </p>
              <p>
                We may also share your Personal Data and other information to
                trusted third-party entities engaged by Tapa King to undertake
                variety of tasks, which includes but not limited to, accomplishing
                orders, assist in marketing, technical support for our online
                services on various online platforms, and similar functions. These
                entities may have access to your Personal Data in order to perform
                their tasks. While we endeavor to require these entities to
                conform with appropriate privacy policies, you agree that we are
                not responsible for any violations, nor for actions, omissions or
                negligence of any such entities in violation of this Privacy
                Policy.
              </p>
              <p>
                Tapa King may ask you to receive marketing materials from our
                business partners. If you agree to receive such materials, Tapa
                King will send you mail or e-mail on behalf of the partners.
              </p>
              <p>
                Tapa King reserves the right to use or disclose any information to
                comply with any law, regulation or legal request, or to cooperate
                in any law enforcement investigation.
              </p>
            </div>
            <h3 className="mt-4 font-bold">
              Protection and Security of Personal Data
            </h3>
            <p>
              To ensure the security of your Personal Data, Tapa King utilizes
              industry standard encryption software and technologies in the
              processing of visitors’ data. We implement appropriate security
              measures that protect against loss, misuse, or alteration of your
              Personal Data. Despite these measures, you understand that there
              may be circumstances beyond Tapa King’s reasonable control that
              may render these security measures insufficient and under such
              circumstance, you agree that, Tapa King shall not be responsible
              or liable for any unauthorized use, transfer, alteration, loss, or
              damage to any information that Tapa King may have gathered from
              you.
            </p>
            <h3 className="mt-4 font-bold">Retention of data</h3>
            <p>
              Unless otherwise required by law or other lawful orders, Tapa King
              will only retain Personal Data for such period necessary to serve
              the purpose/s for which they were collected, or a period no longer
              than 13 months after the purposes for which the Personal Data was
              collected have ceased.
            </p>
            <h3 className="mt-4 font-bold">Access</h3>
            <p>
              You are in control of the Personal Data you provide us. You can
              access, modify, correct, update, or withdraw your Personal Data by
              contacting us through the Contact information provided below.
            </p>
            <h3 className="mt-4 font-bold">Cookies</h3>
            <p>
              Tapa King uses ‘cookies'. Cookies are used to store information
              including visitors' preference, and the pages on the website that
              the visitor accessed or visited. The information are used to
              optimize your experience by customizing our web page content based
              on visitors' browser type and/or other information.
            </p>
            <h4 className="mt-4 font-semibold">Cookie description</h4>
            <p>
              Tapa King uses analytics cookie, a first party browser-based
              cookie which allows the site to measure audience behavior. There
              is no personally identifiable information, including your IP
              address stored in these cookies.
            </p>
            <h3 className="mt-4 font-bold">Links to other sites</h3>
            <p>
              Our website may contain links to other sites of interest,
              including a third-party online ordering service that you may be
              directed to. These sites are outside Tapa King’s domain and they
              have their own privacy policy. Once you used these links to leave
              our site, we do not have any control over your information. We
              will not be responsible for the protection and privacy of any
              information which you provide while visiting such sites.
            </p>
            <h3 className="mt-4 font-bold">Updates to our Privacy Policy</h3>
            <p>
              This Privacy Policy is effective as of January 1, 2021. It may be
              necessary for TKI to update this Privacy Policy periodically.
              Revised policy will be posted here. ‍
            </p>
            <h3 className="mt-4 font-bold">How to Contact Us</h3>
            <p>
              For questions or more information about our Privacy Policy, you
              may contact us through our email: <span className='text-blue-900'>mktg@tapakinginc.com</span>
            </p>
          </div>
        </ScrollArea>
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
