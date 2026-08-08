import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import { getMe, login, signup } from './api/auth'
import './App.css'

function App() {
  const queryClient = useQueryClient()
  const [mode, setMode] = useState('login')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleAuthSuccess = (data) => {
    if (data.token) {
      localStorage.setItem('token', data.token)
      queryClient.invalidateQueries({ queryKey: ['me'] })
    }
  }

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: handleAuthSuccess,
  })
  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: handleAuthSuccess,
  })

  const mutation = mode === 'login' ? loginMutation : signupMutation

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: !!localStorage.getItem('token'),
  })

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
      <Stack spacing={3} className="app-stack">
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

        {isUserLoading ? (
          <Card className="auth-card">
            <CardContent className="user-card-content">
              <CircularProgress size={28} />
            </CardContent>
          </Card>
        ) : null}

        {user ? (
          <Card className="auth-card">
            <CardContent>
              <Typography className="eyebrow">Current User</Typography>
              <Typography variant="h5" className="auth-title">
                Welcome, {user.name || user.email}
              </Typography>
              {user.email ? (
                <Typography className="auth-copy">{user.email}</Typography>
              ) : null}
            </CardContent>
          </Card>
        ) : null}
      </Stack>
    </Box>
  )
}

export default App
