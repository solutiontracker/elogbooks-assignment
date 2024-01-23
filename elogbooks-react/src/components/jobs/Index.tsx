/* eslint-disable react-hooks/exhaustive-deps */
// MyComponent.tsx
import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import UseJobService from '@/store/services/UseJobService';
import UseResponseService from '@/store/services/UseResponseService';
import { Job } from '@/models/Job';
import debounce from "lodash/debounce";

// Use FC (Functional Component) type for functional components
const Index: FC = () => {

    const ref = React.useRef(false);

    const [page, setPage] = React.useState(0);

    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const { response } = UseResponseService();

    const { jobs, dispatchJobAction } = UseJobService();

    const handleSearch = (query: string) => {
        dispatchJobAction({ query: query, page: 0, limit: rowsPerPage });
        setPage(0);
    }

    const debouncedHandleSearch = React.useMemo(() => {
        return debounce(handleSearch, 1000);
    }, []);

    React.useEffect(() => {
        dispatchJobAction({ query: '', page: page, limit: rowsPerPage });
    }, [rowsPerPage, page]);

    React.useEffect(() => {
        if (jobs.length > 0) {
            ref.current = true;
        }
    }, [jobs]);
    interface Column {
        id: 'id' | 'summary' | 'status' | 'property' | 'user';
        label: string;
        minWidth?: number;
        align?: 'right';
        format?: (value: number) => string;
    }

    const columns: readonly Column[] = [
        { id: 'id', label: 'ID', minWidth: 170 },
        { id: 'summary', label: 'Summary', minWidth: 100 },
        {
            id: 'status',
            label: 'Status',
            minWidth: 170,
            align: 'right',
            format: (value: number) => value.toLocaleString('en-US'),
        },
        {
            id: 'property',
            label: 'Property name',
            minWidth: 170,
            align: 'right',
            format: (value: number) => value.toLocaleString('en-US'),
        },
        {
            id: 'user',
            label: 'Raised By',
            minWidth: 170,
            align: 'right',
            format: (value: number) => value.toFixed(2),
        },
    ];

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <React.Fragment>
            <Container maxWidth="xl" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', height: '100vh' }}>
                <Box flex={1} width={'100%'} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', marginBottom: '10px' }}>
                    <Box flex={5}>
                        <div style={{ display: 'flex', marginBottom: '10px', width: '30%' }}>
                            <TextField
                                id="outlined-search"
                                label="Search"
                                type="search"
                                variant="outlined"
                                onChange={(e) => debouncedHandleSearch(e.target.value)}
                                style={{ flex: 1 }}
                            />
                        </div>
                    </Box>
                    <Link to="/job/add">
                        <Button style={{ flex: 1, justifyContent: 'center' }} variant="contained">Add Job</Button>
                    </Link>
                </Box>

                <Box flex={4} width={'100%'}>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {jobs
                                        .map((row: Job) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                    {columns.map((column) => {
                                                        const value = row?.[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {column.format && typeof value === 'number'
                                                                    ? column.format(value)
                                                                    : value}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={response?.data?.meta?.total}
                            rowsPerPage={response?.data?.meta?.per_page}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default Index;