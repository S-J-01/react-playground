import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

function FeedbackForm() {
  const [submittedName, setSubmittedName] = useState('')
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  const onSubmit = (data) => {
    setSubmittedName(data.name)
    reset()
  }

  return (
    <Card className="auth-card">
      <CardContent>
        <Stack spacing={3}>
          <Box>
            <Typography className="eyebrow">React Hook Form</Typography>
            <Typography variant="h4" className="auth-title">
              Send feedback
            </Typography>
            <Typography className="auth-copy">
              A small client-side form with React Hook Form validation.
            </Typography>
          </Box>

          {submittedName ? (
            <Alert severity="success">Thanks, {submittedName}. Your feedback was captured.</Alert>
          ) : null}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2.5}>
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Name"
                    fullWidth
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    type="email"
                    fullWidth
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                )}
              />

              <Controller
                name="message"
                control={control}
                rules={{
                  required: 'Message is required',
                  minLength: {
                    value: 10,
                    message: 'Message must be at least 10 characters',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Message"
                    fullWidth
                    multiline
                    minRows={3}
                    error={Boolean(errors.message)}
                    helperText={errors.message?.message}
                  />
                )}
              />

              <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send feedback'}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default FeedbackForm
