import { Box, IconButton, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useRef, useEffect, useCallback } from 'react';
import {
  useDeleteTagMutation,
  useUpdateTagMutation
} from '../../generated/graphql-types';

type TagItemProps = {
  id: number;
  name: string;
  onRefetch: () => void;
};

const TagItem = ({ id, name, onRefetch }: TagItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);
  const [updateTag] = useUpdateTagMutation();
  const [deleteTag] = useDeleteTagMutation();

  const handleSave = useCallback(async () => {
    const newName = editedName.trim();
    if (newName && newName !== name) {
      try {
        const response = await updateTag({
          variables: {
            input: { id, name: newName }
          }
        });
        if (response.data?.updateTag) {
          onRefetch();
        }
      } catch (err) {
        console.error('Error updating tag:', err);
        setEditedName(name);
      }
    } else {
      setEditedName(name);
    }
    setIsEditing(false);
  }, [editedName, name, id, updateTag, onRefetch]);

  const handleDelete = async () => {
    try {
      const response = await deleteTag({
        variables: { id }
      });
      if (response.data?.deleteTag) {
        onRefetch();
      }
    } catch (err) {
      console.error('Error deleting tag:', err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        handleSave();
      }
    };

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, handleSave]);

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
        transform: isEditing ? 'scale(1.05)' : 'scale(1)',
        cursor: 'pointer'
      }}
      onClick={() => !isEditing && setIsEditing(true)}
    >
      {isEditing ? (
        <TextField
          inputRef={inputRef}
          size="small"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSave();
            } else if (e.key === 'Escape') {
              setEditedName(name);
              setIsEditing(false);
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
          handleDelete();
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

export default TagItem;
