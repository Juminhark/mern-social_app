import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';

const input = ({ half, name }) => {
	return (
		<Grid item xs={12} sm={half ? 6 : 12}>
			<TextField
				name={name}
				onChange={handleChange}
				variant="outlined"
				required
				fullWidth
			/>
		</Grid>
	);
};

export default input;
