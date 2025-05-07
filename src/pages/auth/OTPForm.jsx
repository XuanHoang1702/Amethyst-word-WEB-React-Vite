// import React, { useState, useRef, useEffect } from 'react';

// const OTPForm = () => {
//   const OTP_LENGTH = 4;
//   const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
//   const [timer, setTimer] = useState(59);
//   const [error, setError] = useState('');
//   const inputsRef = useRef([]);

//   useEffect(() => {
//     if (timer > 0) {
//       const countdown = setTimeout(() => setTimer(timer - 1), 1000);
//       return () => clearTimeout(countdown);
//     }
//   }, [timer]);

//   const handleChange = (e, index) => {
//     const value = e.target.value;
//     if (!/^\d*$/.test(value)) return; // Chỉ cho phép số
  
//     const newOtp = [...otp];
//     newOtp[index] = value.slice(-1); // chỉ lấy ký tự cuối cùng
//     setOtp(newOtp);
//     setError('');
  
//     if (value && index < OTP_LENGTH - 1) {
//       inputsRef.current[index + 1].focus();
//     }
//   };
  

//   const handleVerify = () => {
//     const enteredOtp = otp.join('');
//     if (enteredOtp.length !== OTP_LENGTH || enteredOtp !== '1234') {
//       setError('Mã OTP không hợp lệ!');
//     } else {
//       alert('Xác thực thành công!');
//     }
//   };

//   const handleResend = () => {
//     setOtp(Array(OTP_LENGTH).fill(''));
//     setTimer(59);
//     setError('');
//     inputsRef.current[0].focus();
//     alert('Đã gửi lại mã OTP!');
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <h2 className="text-2xl font-bold mb-4">Xác thực OTP</h2>

//       <div className="flex space-x-4 mb-4">
//         {otp.map((data, index) => (
//           <input
//             key={index}
//             ref={(el) => (inputsRef.current[index] = el)}
//             type="text"
//             maxLength="1"
//             className="w-16 h-16 text-2xl text-center border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
//             value={data}
//             onChange={(e) => handleChange(e.target, index)}
//           />
//         ))}
//       </div>

//       {error && <p className="text-red-500 mb-2">{error}</p>}

//       <button
//         onClick={handleVerify}
//         className="bg-blue-500 text-white py-2 px-8 rounded-lg hover:bg-blue-600 mb-4"
//       >
//         Xác nhận
//       </button>

//       {timer > 0 ? (
//         <p className="text-gray-500">Gửi lại mã sau {timer}s</p>
//       ) : (
//         <button
//           onClick={handleResend}
//           className="text-blue-500 underline"
//         >
//           Gửi lại mã OTP
//         </button>
//       )}
//     </div>
//   );
// };

// export default OTPForm;


import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';


const OTPForm = () => {
  const OTP_LENGTH = 4;
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(59);
  const [error, setError] = useState('');
  const inputsRef = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return; // chỉ cho nhập số (0-9)

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // lấy đúng 1 ký tự
    setOtp(newOtp);
    setError('');

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== OTP_LENGTH || enteredOtp !== '1234') {
      setError('Mã OTP không hợp lệ!');
    } else {
      alert('Xác thực thành công!');
    }
  };

  const handleResend = () => {
    setOtp(Array(OTP_LENGTH).fill(''));
    setTimer(59);
    setError('');
    inputsRef.current[0].focus();
    alert('Đã gửi lại mã OTP!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Xác thực OTP</h2>

      <div className="flex space-x-4 mb-4">
        {otp.map((digit, index) => (  
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            inputMode="numeric" // giúp mobile hiện bàn phím số
            maxLength="1"
            className="w-16 h-16 text-2xl text-center border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        onClick={handleVerify}
        className="bg-blue-500 text-white py-2 px-8 rounded-lg hover:bg-blue-600 mb-4"
      >
        Xác nhận
      </button>

      {timer > 0 ? (
        <p className="text-gray-500">Gửi lại mã sau {timer}s</p>
      ) : (
      
        <button
          onClick={handleResend}
          className="text-blue-500 underline"
        >
          Gửi lại mã OTP
        </button>
      )}
    </div>
  );
};

export default OTPForm;
