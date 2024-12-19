import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  useDeactivateBrandMutation,
  useGetBrandByIdQuery,
  useUpdateBrandMutation
} from '../generated/graphql-types';
import { useParams } from 'react-router-dom';
import GreenSwitch from '../ui/Switch';

interface BrandReq {
  name: string;
  description: string;
  logo: string;
  deletedAt: Date | null;
}

export default function BrandDetails() {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<string | null>('');
  const [brand, setBrand] = useState<BrandReq>({
    name: '',
    description: '',
    logo: '',
    deletedAt: null
  });
  const [
    deactivateBrand,
    { error: deactivateError, loading: deactivateLoading }
  ] = useDeactivateBrandMutation();
  const [updateBrand, { loading: updateLoading, error: updateError }] =
    useUpdateBrandMutation();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
      setBrand({
        name: data.getBrandById.name,
        description: data.getBrandById.description,
        logo: data.getBrandById.logo,
        deletedAt: data.getBrandById.deletedAt || null
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
      setBrand((prev) => ({
        ...prev,
        deletedAt: null
      }));
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
            description: brand.description,
            logo: brand.logo
          }
        }
      });

      if (data?.updateBrand) {
        setBrand({
          name: '',
          description: '',
          logo: '',
          deletedAt: null
        });
        setSuccessMessage('Marque mise à jour avec succès !');
      } else if (updateError) {
        setSuccessMessage(null);
        setError(updateError.message);
        console.error(
          'Erreur lors de la mise à jour de la marque :',
          updateError
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading || updateLoading) return <p>Loading...</p>;

  return (
    <>
      <GreenSwitch
        checked={brand.deletedAt === null}
        onChange={handleSwitchChange}
        disabled={deactivateLoading}
      />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          m: 1,
          width: '60ch',
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
        />
        <Button
          variant="contained"
          disabled={loading}
          color="primary"
          type="submit"
          sx={{
            width: '20ch',
            alignSelf: 'flex-end'
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
    </>
  );
}
