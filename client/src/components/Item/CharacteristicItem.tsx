import { useState, useCallback, useRef, useEffect } from 'react';
import {
  useEditCharacteristicMutation,
  useDisableCharactertisticMutation
} from '../../generated/graphql-types';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type CharacteristicItemProps = {
  id: number;
  name: string;
  onRefetch: () => void;
};

const CharacteristicItem = ({
  id,
  name,
  onRefetch
}: CharacteristicItemProps) => {
  const [editing, SetEditing] = useState(false);
  const [editName, SetEditName] = useState(name);
  const [editCharacteristic] = useEditCharacteristicMutation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [disableCharacteristic] = useDisableCharactertisticMutation();

  const handleSaveEdit = useCallback(async () => {
    const newName = editName.trim();

    if (newName && newName !== name) {
      try {
        const response = await editCharacteristic({
          variables: {
            characteristic: {
              id,
              name: newName
            }
          }
        });
        if (response.data?.editCharacteristic) {
          await onRefetch();
        }
      } catch (err) {
        console.error(err);
        SetEditName(name);
      }
    } else {
      SetEditName(name);
    }
    SetEditing(false);
  }, [editName, name, id, editCharacteristic, onRefetch]);

  useEffect(() => {
    const handleClickStop = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        handleSaveEdit();
      }
    };
    if (editing) {
      document.addEventListener('mousedown', handleClickStop);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickStop);
    };
  }, [editing, handleSaveEdit]);

  const handleDisable = async () => {
    try {
      const response = await disableCharacteristic({
        variables: { disableCharacteristicId: id }
      });
      if (response.data?.disableCharacteristic) {
        onRefetch();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: '20px',
        padding: '4px 12px',
        margin: '4px',
        gap: 1,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s ease-in-out',
        transform: editing ? 'scale(1.05)' : 'scale(1)',
        cursor: 'pointer'
      }}
      onClick={() => !editing && SetEditing(true)}
    >
      {editing ? (
        <TextField
          inputRef={inputRef}
          size="small"
          value={editName}
          onChange={(e) => SetEditName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSaveEdit();
            } else if (e.key === 'Escape') {
              SetEditName(name);
              SetEditing(false);
            }
          }}
          autoFocus
          sx={{
            width: '100px',
            '& .MuiInputBase-input': {
              padding: '2px 4px'
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { border: 'none' },
              '&:hover fieldset': { border: 'none' },
              '&.Mui-focused fieldset': { border: 'none' }
            }
          }}
        />
      ) : (
        <Typography>{name}</Typography>
      )}
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          handleDisable();
        }}
        sx={{
          color: '#d32f2f',
          '&:hover': {
            backgroundColor: 'rgba(211, 47, 47, 0.1)'
          }
        }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default CharacteristicItem;
