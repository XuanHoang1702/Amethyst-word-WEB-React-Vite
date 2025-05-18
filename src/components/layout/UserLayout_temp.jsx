import { useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import OTPForm from '../../pages/auth/OTPForm';
import Footer from './Footer';
import Header from './Header';

const UserLayout = () => {
    const [isOtpOpen, setIsOtpOpen] = useState(false);
    const [otpData, setOtpData] = useState(null);
    const { setUsername } = useContext(AuthContext);

    const openOtpModal = (data) => {
        setOtpData(data);
        setIsOtpOpen(true);
    };

    const closeOtpModal = () => {
        setIsOtpOpen(false);
        setOtpData(null);
    };

    const handleLoginSuccess = (username) => {
        setUsername(username);
        closeOtpModal();
    };

    return (
        <div>
        <Header />
        <main>
            <Outlet context={{ openOtpModal }} />
        </main>
        <Footer />
        {isOtpOpen && (
            <OTPForm
            email={otpData?.email}
            userData={otpData?.userData}
            onClose={closeOtpModal}
            onLoginSuccess={handleLoginSuccess}
            />
        )}
        </div>
    );
};

export default UserLayout;