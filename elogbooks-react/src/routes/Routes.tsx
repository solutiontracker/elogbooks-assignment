import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JobComponent from '@/components/jobs/Index';
import Add from '@/components/jobs/Add';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/jobs" element={<JobComponent />} />
                <Route path="/job/add" element={<Add />} />
            </Routes>
        </Router>
    );
};

export default App;