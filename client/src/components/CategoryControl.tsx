import React from 'react'

export default function CategoryControl() {
  return (
    <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 2 }}>
            <Autocomplete
              multiple
              options={
                categoriesData?.getAllCategories?.filter(
                  (cat) =>
                    !formProduct.categories.some(
                      (selected) => selected.id === cat.id
                    )
                ) || []
              }
              getOptionLabel={(option) => option.name}
              value={[]}
              onChange={(_, newValue) => {
                if (newValue.length > 0) {
                  const lastSelected = newValue[newValue.length - 1];

                  if (
                    !formProduct.categories.some(
                      (cat) => cat.id === lastSelected.id
                    )
                  ) {
                    setFormProduct((prev) => ({
                      ...prev,
                      categories: [...prev.categories, lastSelected]
                    }));
                  }
                }
              }}
              filterOptions={(options) =>
                options.filter(
                  (option) =>
                    !formProduct.categories.some((cat) => cat.id === option.id)
                )
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Sélectionner une catégorie"
                  size="small"
                />
              )}
            />
          </FormControl>
  )
}
