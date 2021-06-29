import './App.css';
import Routes from './Routes';
import history from './history';
import { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';


function App() {

  const [txnId, setTxnId] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [errText, setErrText] = useState("");

  var flag = false;

  useEffect(() => {
    history.push('/login');
  }, []);


  const getOtpHandler = (mobNum) => {
    fetch("https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP", {
      method: "POST",
      body: JSON.stringify({
        "mobile": mobNum
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => {
        if (!r.ok) {
          flag = true;
        } else {
          flag = false;
          setErrText("");
        }
        return r.json();
      })
      .then((r) => {
        if (flag) {
          setErr(true);
          setErrText(r.error);
        } else {
          setTxnId(r.txnId);
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            history.push('/verify');
          }, 1000);
        }
      })
  }

  const verifyOtpHandler = (otp) => {
    const hash = CryptoJS.SHA256(otp);
    const hashedOtp = hash.toString();
    fetch("https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP", {
      method: "POST",
      body: JSON.stringify({
        "otp": hashedOtp,
        "txnId": txnId
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => {
        if (!r.ok) {
          flag = true;
        } else {
          flag = false;
          setErrText("");
        }
        return r.json();
      })
      .then((r) => {
        if (flag) {
          setErr(true);
          setErrText(r.error);
        } else {
          setToken(r.token);
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            history.push('/download');
          }, 1000);
        }
      })
  }

  const downloadHandler = (beneficiary) => {
    fetch("https://cdn-api.co-vin.in/api/v2/registration/certificate/public/download?beneficiary_reference_id=" + beneficiary, {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
        "Authorization": "Bearer " + token
      },
    })
      .then((r) => {
        if (!r.ok) {
          flag = true;
          setErr(true);
          if(r.status === 401) {
            setErrText("Unauthenticated access!");
          } else if(r.status === 500) {
            setErrText("beneficiary_reference_id does not exist");
          } else {
            setErrText("Some Error Occured");
          }
          return r;
        } else {
          return r.blob();
        }
      })
      .then((r) => {
        if (!flag) {
          setLoading(true);
          setErrText("");
          setTimeout(() => {
            const url = window.URL.createObjectURL(new Blob([r]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'certificate.pdf');
            document.body.appendChild(link);
            link.click();
            setLoading(false);
          }, 1000);

        }
      })
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Cowin Certificate Downloader</h1>
        </header>
      </div>
      <Routes
        err={err}
        errText={errText}
        loading={loading}
        getOtpHandler={getOtpHandler}
        verifyOtpHandler={verifyOtpHandler}
        downloadHandler={downloadHandler}
      />
    </>
  )
}

export default App;
