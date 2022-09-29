import React, { ChangeEvent, useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Stack,
  Link as MuiLink,
  useTheme,
} from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTranslation } from '../lib/translations';

import styles from '../styles/pages/SignIn&SignUp.module.css';
import { useLoginContext } from '../lib/loginContext';
import { login, InvalidCredentialsError } from '../lib/api/api';

interface EditorState {
  username: string;
  password: string;
}

interface EditorErrors {
  email: string;
  password: string;
}

export default function SignIn() {
  const { user, credentialsManager } = useLoginContext();
  const theme = useTheme();
  const { i18n } = useTranslation();
  const router = useRouter();
  const [editorState, setEditorState] = useState<EditorState>({
    username: '',
    password: '',
  });
  const [editorErrors, setEditorErrors] = useState<EditorErrors>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  // if the user is logged in, redirect to the home page
  if (user) router.push('/');

  // --- check ---

  const checkUsername = () => {
    if (!editorState.username) {
      setEditorErrors({
        ...editorErrors,
        email: i18n.t('signIn.emailRequired'),
      });
      return false;
    }

    return true;
  };

  const checkPassword = () => {
    if (!editorState.password) {
      setEditorErrors({
        ...editorErrors,
        password: i18n.t('signIn.passwordRequired'),
      });
      return false;
    }
    return true;
  };

  // --- handlers ---

  const handleUsernameChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditorState({ ...editorState, username: event.target.value });
  };

  const handlePasswordChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditorState({ ...editorState, password: event.target.value });
  };

  const handleLogin = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    evt.preventDefault();

    if (checkUsername() && checkPassword()) {
      setEditorErrors({ email: '', password: '' });
      setLoading(true);
      login(editorState.username, editorState.password, credentialsManager)
        .then(() => {
          // redirect to the last page
          router.back();
        })
        .catch((reason) => {
          // handle error
          if (reason === InvalidCredentialsError) {
            console.error(
              <Typography>{i18n.t('signIn.invalidCreditentials')}</Typography>
            );
          } else {
            console.error(<Typography>{i18n.t('unexpectedError')}</Typography>);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  // --- render ---

  return (
    <>
      <Head>
        <title>{i18n.t('signIn.title')}</title>
      </Head>
      <Box
        className={styles.container}
        sx={{ color: theme.palette.text.primary }}
      >
        <form>
          <Typography variant="h4">
            <span style={{ color: theme.palette.primary.main }}>Wall</span>
            Changer
          </Typography>

          <Stack spacing={2}>
            <TextField
              type="text"
              onChange={handleUsernameChange}
              label={i18n.t('user.username')}
              variant="standard"
              error={editorErrors.email !== ''}
              helperText={editorErrors.email}
            />

            <TextField
              type="password"
              onChange={handlePasswordChange}
              label={i18n.t('user.password')}
              variant="standard"
              error={editorErrors.password !== ''}
              helperText={editorErrors.password}
            />
          </Stack>
          <LoadingButton
            variant="contained"
            className={styles.loginButton}
            onClick={handleLogin}
            loading={loading}
            type="submit"
          >
            {i18n.t('signIn.signIn')}
          </LoadingButton>

          <Typography variant="body1">
            {i18n.t('signIn.dontHaveAccount')}{' '}
            <Link href="/sign-up" passHref>
              <MuiLink>{i18n.t('signUp.signUp')}</MuiLink>
            </Link>
          </Typography>
        </form>
      </Box>
    </>
  );
}
