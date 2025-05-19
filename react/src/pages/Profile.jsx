import React, { useRef, useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess
} from '../redux/user/userSlice';

export default function Profile() {
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const token = sessionStorage.getItem("token");
      const res = await fetch(`https://kayumba-jmv-java-spring-boot-backend-apis.onrender.com/api/user/${currentUser.id}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      navigate('/home');
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const token = sessionStorage.getItem("token");
      const res = await fetch(`https://kayumba-jmv-java-spring-boot-backend-apis.onrender.com/api/user/${currentUser.id}/delete`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      handleLogout();
      dispatch(deleteUserSuccess(data.message));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(signOutUserStart());
      sessionStorage.removeItem("token");
      navigate('/');
      dispatch(signOutUserSuccess());
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  // Extracted upload status message to avoid nested ternary
  let uploadStatusMessage = '';
  if (fileUploadError) {
    uploadStatusMessage = (
      <span className='text-red-700'>
        Error Image upload (image must be less than 2 mb)
      </span>
    );
  } else if (filePerc > 0 && filePerc < 100) {
    uploadStatusMessage = (
      <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
    );
  } else if (filePerc === 100) {
    uploadStatusMessage = (
      <span className='text-green-700'>Image successfully uploaded!</span>
    );
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <button
          type="button"
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 p-0 border-none bg-transparent"
          aria-label="Change profile picture"
          style={{ padding: 0, border: 'none', background: 'transparent' }}
        >
          <img
            src={formData.avatar || currentUser.avatar}
            alt="profile"
            className="rounded-full h-24 w-24 object-cover"
            draggable={false}
          />
        </button>
        <p className='text-sm self-center'>
          {uploadStatusMessage}
        </p>
        <input
          type='text'
          placeholder='name'
          defaultValue={currentUser.name}
          id='name'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          id='username'
          defaultValue={currentUser.username}
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          onChange={handleChange}
          id='password'
          className='border p-3 rounded-lg'
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <button
          type="button"
          onClick={handleDeleteUser}
          className='text-red-700 cursor-pointer bg-transparent border-none p-0 underline'
          style={{ background: 'none', border: 'none' }}
        >
          Delete account
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className='text-red-700 cursor-pointer bg-transparent border-none p-0 underline'
          style={{ background: 'none', border: 'none' }}
        >
          Sign out
        </button>
      </div>

      <p className='text-red-700 mt-5'>{error}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
    </div>
  );
}
