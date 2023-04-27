import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { ArrowCircleLeft } from '@mui/icons-material';
import Dropzone from '../Components/Dropzone';
import uploadFile from '../../../api/uploadfile';
import { updateOrganizationOne } from '../../../api/endpoints/organization';
import { useNavigate } from "react-router-dom";
import axios from '../../../api/axios';
import useToast from '../../../hooks/useToast';

export default function OrganisationSingle({ data, setData }) {
  const [ organization, setOrganization ] = useState(data);
  const navigate = useNavigate();
  const { toast } = useToast({
    config: { 
        loading: 'Fetching organizations...', 
        error: 'Failed on fetching organizations', 
        success: 'Organizations updated',
    },
    options: { id: 'tams' },
  })
  // const initState = {
  //   about: '',
  //   mission: '',
  //   plan: '',
  //   history: '',
  //   goals: '',
  //   info: '',
  //   founderDetails: '',
  //   location: '',
  // };

  const [formData, setFormData] = useState(organization);
  const [filesVideo, setFilesVideo] = useState([]);
  const [filesPhoto, setFilesPhoto] = useState([]);
  const [filesCertificate, setFilesCertificate] = useState([]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onDropFilesVideo = useCallback(
    acceptedFiles => {
      setFilesVideo([...filesVideo, ...acceptedFiles]);
    },
    [filesVideo]
  );
  const onDropFilesPhoto = useCallback(
    acceptedFiles => {
      setFilesPhoto([...filesPhoto, ...acceptedFiles]);
    },
    [filesPhoto]
  );
  const onDropFilesCertificate = useCallback(
    acceptedFiles => {
      setFilesCertificate([...filesCertificate, ...acceptedFiles]);
    },
    [filesCertificate]
  );

  const uploadFilesPhoto = async () => {
    await uploadFile(filesPhoto, '')
  };
  const uploadFilesVideo = async () => {
    await uploadFile(filesVideo, '')
  };
  const uploadFilesCertificate = async () => {
    await uploadFile(filesCertificate, '')
  };
  const updateOrganization = async () => {
    // event.preventDefault();
    const id = organization.id;
    formData.name = organization.name;
    const data = {...formData};
    const promise = axios(
      updateOrganizationOne({
        id,
        data
      })
    )
    toast(promise)
    const res = await promise
    if(res.status === 200){
        navigate('/admin/organisations')
    } else {
        // TODO: Handle sign up error
    }
  };

  const {
    about,
    mission,
    plans,
    history,
    goals,
    information,
    founder_details,
    location,
  } = formData;

  const items = [
    {
      name: 'about',
      label: 'About the Orgasnisation',
      value: about,
    },
    {
      name: 'mission',
      label: "Organisation's Mission",
      value: mission,
    },
    {
      name: 'plans',
      label: 'How we plan to use our funds',
      value: plans,
    },
    {
      name: 'history',
      label: "Organisation's History",
      value: history,
    },
    {
      name: 'goals',
      label: "Organisation's Goals for the Future",
      value: goals,
    },
    {
      name: 'information',
      label: 'More Info',
      value: information,
    },
    {
      name: 'founder_details',
      label: "Details of the Organisation's Founder",
      value: founder_details,
    },
  ];

  return (
    <>
      <IconButton variant='outlined' onClick={() => setData([])}>
        <ArrowCircleLeft sx={{ fontSize: '2em' }} />
      </IconButton>
      <Typography variant='h5' textAlign={'center'}>
        Details of organisation: {organization.name}
      </Typography>
      <Divider sx={{ my: 5 }} />
      {items.map((item, i) => (
        <FormControl fullWidth sx={{ mb: 3 }} key={i}>
          <Typography variant='h6' sx={{ mb: 2 }}>
            {item.label}
          </Typography>
          <TextField
            label={item.label}
            name={item.name}
            value={item.value}
            multiline
            rows={10}
            onChange={handleChange}
            sx={{ bgcolor: 'white' }}
          />
        </FormControl>
      ))}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Please enter the organisation's location
        </Typography>
        <TextField
          label={'Location'}
          name={'location'}
          value={location}
          onChange={handleChange}
          sx={{ bgcolor: 'white' }}
        />
      </FormControl>
      <Divider sx={{ mb: 3 }} />
      <Paper sx={{ p: 3 }}>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Organisation's Video
        </Typography>
        <Dropzone
          onDrop={onDropFilesVideo}
          files={filesVideo}
          setFiles={filesValues => setFilesVideo(filesValues)}
        />
        <Button variant='contained' onClick={uploadFilesVideo}>Upload</Button>
      </Paper>
      <Paper sx={{ p: 3 }}>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Organisation's Photos
        </Typography>
        <Dropzone
          onDrop={onDropFilesPhoto}
          files={filesPhoto}
          setFiles={filesValues => setFilesPhoto(filesValues)}
        />
        <Button variant='contained' onClick={uploadFilesPhoto}>Upload</Button>
      </Paper>
      <Divider sx={{ mb: 3 }} />
      <Paper sx={{ p: 3 }}>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Organisation's Registration Certificate
        </Typography>
        <Dropzone
          onDrop={onDropFilesCertificate}
          files={filesCertificate}
          setFiles={filesValues => setFilesCertificate(filesValues)}
        />
        <Button variant='contained' onClick={uploadFilesCertificate}>Upload</Button>
      </Paper>
      <Divider sx={{ my: 3 }} />
      <Box sx={{ textAlign: 'right' }}>
        <Button variant='outlined'>Cancel</Button>
        <Button variant='contained' sx={{ ml: 3 }} onClick={updateOrganization}>
          Update
        </Button>
      </Box>
    </>
  );
}
