// MyComponent.tsx
import React, { FC } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Use FC (Functional Component) type for functional components
const Add: FC = () => {

    const handleSubmit = (e: any) => {
        e.preventDefault();
    };

    return (
        <React.Fragment>
            <Container maxWidth="xl" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', height: '100vh' }}>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h4" gutterBottom>
                        Create Job
                    </Typography>
                    <TextField label="Username" variant="outlined" fullWidth margin="normal" />
                    <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" />
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </form>
            </Container>
        </React.Fragment>
    );
};

export default Add;