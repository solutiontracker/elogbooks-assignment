// MyComponent.tsx
import React, { FC } from 'react';
import Container from '@mui/material/Container';
import { Theme, useTheme } from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Textarea from '@mui/joy/Textarea';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import UseJobService from '@/store/services/UseJobService';
import UseResponseService from '@/store/services/UseResponseService';
import UseErrorService from '@/store/services/UseErrorService';
import { Property } from '@/models/Property';
import { useNavigate } from "react-router-dom";
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;

const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(id: number, property_id: number, theme: Theme) {
    return {
        fontWeight:
            property_id !== id
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const Add: FC = () => {

    const { response } = UseResponseService();

    const { errors } = UseErrorService();

    const navigate = useNavigate();

    const { properties, dispatchCreateJobAction, dispatchJobPropertyAction } = UseJobService();

    const [form, setForm] = React.useState({
        summary: '',
        description: '',
        property_id: 0
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        dispatchCreateJobAction(form)
    };

    React.useEffect(() => {
        dispatchJobPropertyAction();
    }, [dispatchJobPropertyAction]);

    React.useEffect(() => {
        if (response?.data?.redirect === "jobs") {
            navigate('/')
        }
    }, [response, navigate]);

    const itemStyle = {
        marginBottom: '15px',
    };

    const theme = useTheme();

    const handleChange = (field: string, value: any) => {
        setForm({ ...form, [field]: value })
    };

    return (
        <React.Fragment>
            <Container maxWidth="xl" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', height: '100vh' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <Typography variant="h4" gutterBottom>
                        Log a job
                    </Typography>
                    <Textarea placeholder="Summary" minRows={3} style={itemStyle} onChange={(event: any) => {
                        handleChange('summary', event.target.value)
                    }} />
                    {errors?.summary?.length > 0 && (
                        <Chip
                            style={itemStyle}
                            label={errors?.summary?.[0]}
                        />
                    )}
                    <Textarea placeholder="Description" style={itemStyle} minRows={4} onChange={(event: any) => {
                        handleChange('description', event.target.value)
                    }} />
                    {errors?.description?.length > 0 && (
                        <Chip
                            style={itemStyle}
                            label={errors?.description?.[0]}
                        />
                    )}
                    <FormControl sx={itemStyle}>
                        <InputLabel id="demo-multiple-chip-label">Property</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            value={form.property_id.toString()}
                            onChange={(event: SelectChangeEvent) => {
                                handleChange('property_id', event.target.value)
                            }}
                            input={<OutlinedInput label="Name" />}
                            MenuProps={MenuProps}
                        >
                            {properties.map((property: Property) => (
                                <MenuItem
                                    key={property.id}
                                    value={property.id}
                                    style={getStyles(property.id, form.property_id, theme)}
                                >
                                    {property.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {errors?.property_id?.length > 0 && (
                        <Chip
                            style={itemStyle}
                            label={errors?.property_id?.[0]}
                        />
                    )}
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </form>
            </Container>
        </React.Fragment>
    );
};

export default Add;