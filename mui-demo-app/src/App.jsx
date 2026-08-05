import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import { login, signup } from './api/auth'
import './App.css'

function App() {
  const [mode, setMode] = useState('login')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const loginMutation = useMutation({ mutationFn: login })
  const signupMutation = useMutation({ mutationFn: signup })

  const mutation = mode === 'login' ? loginMutation : signupMutation

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleModeChange = (_, nextMode) => {
    if (!nextMode) {
      return
    }

    setMode(nextMode)
    loginMutation.reset()
    signupMutation.reset()
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const payload =
      mode === 'signup'
        ? formData
        : { email: formData.email, password: formData.password }

    mutation.mutate(payload)
  }

  const successMessage =
    mutation.isSuccess &&
    (mutation.data?.message ||
      `${mode === 'signup' ? 'Signup' : 'Login'} request succeeded.`)

  return (
    <Box className="app-shell">
      <Card className="auth-card">
        <CardContent>
          <Stack spacing={3}>
            <Box>
              <Typography className="eyebrow">Axios Auth Flow</Typography>
              <Typography variant="h4" className="auth-title">
                {mode === 'login' ? 'Login to continue' : 'Create your account'}
              </Typography>
              <Typography className="auth-copy">
                {mode === 'login'
                  ? 'Use the shared Axios instance to send credentials and surface backend errors.'
                  : 'Send signup data through the same Axios client and handle failures in one place.'}
              </Typography>
            </Box>

            <Tabs value={mode} onChange={handleModeChange} variant="fullWidth">
              <Tab value="login" label="Login" />
              <Tab value="signup" label="Signup" />
            </Tabs>

            {mutation.isError ? (
              <Alert severity="error">{mutation.error.message}</Alert>
            ) : null}
            {successMessage ? <Alert severity="success">{successMessage}</Alert> : null}

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                {mode === 'signup' ? (
                  <TextField
                    label="Full name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                ) : null}

                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  required
                />

                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                  required
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending
                    ? 'Submitting...'
                    : mode === 'login'
                      ? 'Login'
                      : 'Signup'}
                </Button>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}

export default App
