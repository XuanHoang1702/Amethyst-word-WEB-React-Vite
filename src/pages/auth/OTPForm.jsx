// import React, { useState, useEffect, useRef } from 'react';
// import { VerifyOTP, SendOtpEmail, login } from '../../service/UserService';
// import { useNavigate } from 'react-router-dom';

// const OTPForm = ({ email, userData, onClose, onLoginSuccess }) => {
//   const OTP_LENGTH = 4;
//   const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
//   const inputRefs = useRef([])
//   const [timer, setTimer] = useState(59);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const sendInitialOTP = async () => {
      
//       try{
//         const fullname = `${userData.firstName} ${userData.lastName}`.trim();
//         await SendOtpEmail(email, fullname);
//       }
//       catch(error){
//         setError(error.message || 'Lỗi gửi OTP');
//       }
//     };
//       sendInitialOTP();
//     },[email, userData])

//   useEffect(() => {
//     if (timer > 0) {
//       const countdown = setTimeout(() => setTimer(timer - 1), 1000);
//       return () => clearTimeout(countdown);
//     }
//   }, [timer]);

//   const handleChange = (e, index) => {
//     const value = e.target.value.replace(/[^0-9]/g, "");
//     if (value.length > 1) return;
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//     if (value && index < OTP_LENGTH - 1) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const otpCode = otp.join("");
//     if (otpCode.length !== OTP_LENGTH) {
//       setError("Vui lòng nhập đủ 4 chữ số OTP");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await VerifyOTP({ email, otp: otpCode });
//       if (response.token) {
//         localStorage.setItem("token", response.token);
//         onLoginSuccess(userData.lastName);
//         onClose();
//         navigate("/");
//       } else {
//         throw new Error("Không nhận được token từ server");
//       }
//     } catch (error) {
//       setError(error.response?.data?.message || "Xác thực OTP thất bại");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     setLoading(true);
//     try {
//       const fullName = `${userData.firstName} ${userData.lastName}`.trim();
//       await SendOtpEmail(email, fullName);
//       setTimer(59);
//       setError("");
//       setOtp(Array(OTP_LENGTH).fill(""));
//       alert(`Đã gửi lại mã OTP đến ${email}`);
//     } catch (error) {
//       setError(error.response?.data?.message || "Lỗi gửi OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//     <div className="bg-white rounded-lg p-8 max-w-md w-full">
//       <h2 className="text-2xl font-semibold mb-4">Nhập mã OTP</h2>
//       <p className="mb-4">Mã gồm 4 chữ số đã được gửi đến {email}</p>
//       <form onSubmit={handleSubmit}>
//         <div className="flex justify-between mb-4">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               type="text"
//               value={digit}
//               onChange={(e) => handleChange(e, index)}
//               onKeyDown={(e) => handleKeyDown(e, index)}
//               maxLength={1}
//               ref={(el) => (inputRefs.current[index] = el)}
//               className="w-12 h-12 border rounded text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           ))}
//         </div>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
//         >
//           {loading ? "Đang xử lý..." : "Xác nhận"}
//         </button>
//       </form>
//       <div className="mt-4 text-center">
//         {timer > 0 ? (
//           <p>Gửi lại sau {timer}s</p>
//         ) : (
//           <button
//             onClick={handleResendOTP}
//             disabled={loading}
//             className="text-blue-500 hover:underline disabled:text-gray-400"
//           >
//             Gửi lại mã OTP
//           </button>
//         )}
//       </div>
//     </div>
//   </div>
//   );
// };

// export default OTPForm;

import React, { useState, useEffect, useRef } from 'react';
import { VerifyOTP, SendOtpEmail, register } from '../../service/UserService';
import { useNavigate } from 'react-router-dom';

const OTPForm = ({ email, userData, onClose, onLoginSuccess }) => {
  const OTP_LENGTH = 4;
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef([]);
  const [timer, setTimer] = useState(59);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    const sendInitialOTP = async () => {
      setLoading(true);
      try {
        const fullname = `${userData?.firstName} ${userData?.lastName}`.trim();
        await SendOtpEmail(email, fullname);
        setSuccess(`Mã OTP đã được gửi đến ${email}`);
      } catch (error) {
        console.error('Initial OTP Error:', error);
        setError('Không thể gửi mã OTP. Vui lòng thử lại');
      } finally {
        setLoading(false);
      }
    };

    if (email && userData) {
      sendInitialOTP();
    }
  }, [email, userData]);

  
  useEffect(() => {
    const countdown = timer > 0 && setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
    return () => countdown && clearInterval(countdown);
  }, [timer]);


  const validateOTP = (otpCode) => {
    if (!otpCode || otpCode.length !== OTP_LENGTH) {
      setError("Vui lòng nhập đủ 4 chữ số OTP");
      return false;
    }
    if (!/^\d+$/.test(otpCode)) {
      setError("OTP chỉ được chứa số");
      return false;
    }
    return true;
  };

 
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(''); 

  
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };


  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    const otpCode = otp.join("");
    if (!validateOTP(otpCode)) return;

    setLoading(true);
    try {
      const verifyResponse = await VerifyOTP({ 
        email, 
        otp: otpCode,
      });
      
      console.log('Verify OTP Response:', verifyResponse);
      
      if (verifyResponse.code === 200) {
        try {
          const registerResponse = await register({
            ...userData,
            email: email,
            isVerified: true 
          });

          console.log('Register Response:', registerResponse);

          if (registerResponse.success) {
            setSuccess("Đăng ký thành công!");
            
            if (registerResponse.token) {
              localStorage.setItem("token", registerResponse.token);
            }
          
            setTimeout(() => {
              onLoginSuccess(userData?.lastName);
              onClose();
              navigate("/");
            }, 1000);
          } else {
            throw new Error(registerResponse.message || "Đăng ký thất bại");
          }
        } catch (registerError) {
          console.error('Register Error:', registerError);
          setError("Không thể hoàn tất đăng ký. Vui lòng thử lại");
        }
      } else {
        setError(verifyResponse.message || "Mã OTP không chính xác");
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }
    } catch (error) {
      console.error('OTP Verification Error:', error);
      setError("Có lỗi xảy ra. Vui lòng thử lại");
    } finally {
      setLoading(false);
    }
};
  const handleResendOTP = async () => {
    if (loading || timer > 0) return;
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const fullName = `${userData?.firstName} ${userData?.lastName}`.trim();
      await SendOtpEmail(email, fullName);
      setTimer(59);
      setOtp(Array(OTP_LENGTH).fill(""));
      setSuccess(`Đã gửi lại mã OTP đến ${email}`);

      inputRefs.current[0]?.focus();
    } catch (error) {
      console.error('Resend OTP Error:', error);
      setError("Không thể gửi lại mã OTP. Vui lòng thử lại sau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
   
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4">Xác thực OTP</h2>
        <p className="mb-4 text-gray-600">
          Mã xác thực gồm 4 chữ số đã được gửi đến {email}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-14 h-14 border-2 rounded-lg text-center text-2xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                disabled={loading}
              />
            ))}
          </div>

          {error && (
            <p className="text-red-500 mb-4 text-center">{error}</p>
          )}
          {success && (
            <p className="text-green-500 mb-4 text-center">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading || timer === 0}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Đang xử lý..." : "Xác nhận"}
          </button>
        </form>

        <div className="mt-6 text-center">
          {timer > 0 ? (
            <p className="text-gray-500">
              Gửi lại mã sau {timer}s
            </p>
          ) : (
            <button
              onClick={handleResendOTP}
              disabled={loading}
              className="text-blue-500 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Gửi lại mã OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPForm;

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setSuccess('');
    
  //   const otpCode = otp.join("");
  //   if (!validateOTP(otpCode)) return;

  //   setLoading(true);
  //   try {
  //     const response = await VerifyOTP({ 
  //       email, 
  //       otp: otpCode,
  //     });

  //     if (response && response.data) {
  //       const { token, message } = response.data;
        
  //       if (token) {
  //         localStorage.setItem("token", token);
  //         setSuccess(message || "Xác thực thành công!");
          
  //         setTimeout(() => {
  //           onLoginSuccess(userData?.lastName);
  //           onClose();
  //           navigate("/");
  //         }, 1000);
  //       } else {
  //         throw new Error(message || "Token không hợp lệ");
  //       }
  //     } else {
  //       throw new Error("Phản hồi không hợp lệ từ server");
  //     }

  //   } catch (error) {
  //     console.error('OTP Verification Error:', error);
  //       if (error.response) {
  //         const status = error.response.status;
  //         const message = error.response.data?.message;
  //         switch (status) {
  //           case 401:
  //             setError(message || "Mã OTP không chính xác");
  //             break;
  //           case 400:
  //             setError(message || "Mã OTP đã hết hạn");
  //             break;
  //           default:
  //             setError(message || "Xác thực thất bại. Vui lòng thử lại");
  //         }
  //       } else if (error.request) {
    
  //         setError("Không thể kết nối đến server");
  //       } else {
       
  //         setError(error.message || "Xác thực thất bại. Vui lòng thử lại");
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  // };