import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  useActivateBrandMutation,
  useDeactivateBrandMutation,
  useGetBrandByIdQuery,
  useUpdateBrandMutation
} from '../../generated/graphql-types';
import { useParams } from 'react-router-dom';
import { CustomSwitch } from '../../ui/Switch';
import DisplayBrandImage from './DisplayBrandImage';
import AddBrandImage from './AddBrandImage';

interface BrandReq {
  name: string;
  description: string;
  deletedAt: Date | null;
  image?: {
    id: number;
    url: string;
  } | null;
}

const initialState = {
  name: '',
  description: '',
  deletedAt: null,
  image: null
};

export default function BrandDetails() {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string | null>('');
  const [brand, setBrand] = useState<BrandReq>(initialState);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isModifying, setIsModifying] = useState(false);
  const [
    deactivateBrand,
    { error: deactivateError, loading: deactivateLoading }
  ] = useDeactivateBrandMutation();
  const [
    activateBrand,
    { error: activationError, loading: activationLoading }
  ] = useActivateBrandMutation();
  const [updateBrand, { loading: updateLoading }] = useUpdateBrandMutation();

  const {
    loading,
    error: fetchError,
    data,
    refetch
  } = useGetBrandByIdQuery({
    variables: { getBrandByIdId: parseInt(id!) }
  });

  useEffect(() => {
    if (data?.getBrandById) {
      const { name, description, deletedAt, image } = data.getBrandById;
      setBrand({
        name: name,
        description: description,
        deletedAt: deletedAt || null,
        image: image
          ? {
              id: data.getBrandById.image!.id,
              url: data.getBrandById.image!.url
            }
          : null
      });
    } else if (fetchError) {
      setError(fetchError.message);
    }
  }, [data, fetchError]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBrand((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const brandId = parseInt(id!, 10);

    if (!checked) {
      try {
        const { data } = await deactivateBrand({
          variables: { deactivateBrandId: brandId }
        });

        if (data?.deactivateBrand) {
          setBrand((prev) => ({
            ...prev,
            deletedAt: new Date()
          }));
          setSuccessMessage('Marque désactivée avec succès.');
          await refetch();
        } else if (deactivateError!.message) {
          setSuccessMessage(null);
          setError('Erreur lors de la désactivation de la marque.');
        }
      } catch (err) {
        console.error('Error updating brand status: ', err);
        setError('Erreur lors de la désactivation de la marque.');
      }
    } else {
      const { data } = await activateBrand({
        variables: { activateBrandId: brandId }
      });

      if (data?.activateBrand) {
        setBrand((prev) => ({
          ...prev,
          deletedAt: null
        }));
        setSuccessMessage('Marque activée avec succès.');
        await refetch();
      } else if (activationError!.message) {
        setSuccessMessage(null);
        setError('Erreur lors de la désactivation de la marque.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!brand.name) {
      return;
    }

    try {
      const { data } = await updateBrand({
        variables: {
          data: {
            id: parseInt(id!),
            name: brand.name,
            description: brand.description
          }
        }
      });

      if (data?.updateBrand) {
        setSuccessMessage('Marque mise à jour avec succès !');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        setError(err.message);
      }
    }
  };

  if (loading || updateLoading) return <p>Loading...</p>;

  return (
    <Box
      sx={{
        display: 'flex',
        padding: '2rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        height: 'fit-content'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {brand.image && !isModifying ? (
          <DisplayBrandImage
            image={brand.image}
            isModifying={isModifying}
            setIsModifying={setIsModifying}
            refetch={refetch}
          />
        ) : (
          <AddBrandImage
            brandId={parseInt(id!, 10)}
            setIsModifying={setIsModifying}
            refetch={refetch}
          />
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          margin: '0 50px',
          gap: 1
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <CustomSwitch
            checked={brand.deletedAt === null}
            onChange={handleSwitchChange}
            disabled={deactivateLoading || activationLoading}
            sx={{
              display: 'flex',
              justifyContent: 'left'
            }}
          />
          <Typography
            sx={{
              color: brand.deletedAt ? 'error.main' : 'success.main',
              fontWeight: 'bold'
            }}
          >
            {brand.deletedAt ? 'Désactivée' : 'Activée'}
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            m: 1,
            width: '30ch',
            fontWeight: 'bold',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            maxWidth: 400,
            margin: '0 auto'
          }}
          noValidate
          autoComplete="off"
        >
          <Typography
            sx={{
              marginLeft: '2px',
              fontWeight: 'bold'
            }}
          >
            Nom
          </Typography>
          <TextField
            required
            id="outlined-required"
            name="name"
            value={brand.name}
            onChange={handleChange}
            placeholder="Nom"
            sx={{
              '& .MuiInputBase-root': {
                height: 40,
                borderRadius: '10px'
              }
            }}
          />
          <Typography
            sx={{
              marginLeft: '2px',
              fontWeight: 'bold'
            }}
          >
            Description
          </Typography>
          <TextField
            required
            id="outlined-required"
            name="description"
            value={brand.description}
            onChange={handleChange}
            placeholder="Description"
            sx={{
              '& .MuiInputBase-root': {
                height: 40,
                borderRadius: '10px'
              }
            }}
          />
          <Button
            variant="contained"
            disabled={loading}
            color="primary"
            type="submit"
            sx={{
              width: '10rem',
              alignSelf: 'flex-end',
              borderRadius: '10px',
              marginTop: '2rem'
            }}
          >
            Enregistrer
          </Button>
          {successMessage && (
            <Typography
              color="success.main"
              variant="body2"
              sx={{
                display: 'flex',
                justifyContent: 'end'
              }}
            >
              {successMessage}
            </Typography>
          )}
          {error && (
            <Typography
              color="error.main"
              variant="body2"
              sx={{
                display: 'flex',
                justifyContent: 'end'
              }}
            >
              Une erreur s'est produite : {error}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
