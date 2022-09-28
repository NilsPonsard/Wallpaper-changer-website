import Head from 'next/head';
import React from 'react';

import { useLoginContext } from '../lib/loginContext';
import { useTranslation } from '../lib/translations';

export default function Index() {
  const { user } = useLoginContext();
  const { i18n } = useTranslation();

  // if user is logged in then show the home page

  if (user)
    return (
      <>
        <Head>
          <title>{i18n.t('pages.index.homeTitle')}</title>
        </Head>
        <div>{i18n.t('home.logged')}</div>
      </>
    );

  // else show the landing page

  return (
    <>
      <Head>
        <title>{i18n.t('pages.index.landingTitle')}</title>
      </Head>
      <div>{i18n.t('home.welcome')}</div>
      
    </>
  );
}
