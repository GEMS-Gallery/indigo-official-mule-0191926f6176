import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, CardActions, Button, AppBar, Toolbar, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { backend } from 'declarations/backend';

interface Gem {
  id: string;
  title: string;
  thumbnail: string;
  githubUrl: string;
}

const App: React.FC = () => {
  const [gems, setGems] = useState<Gem[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newGem, setNewGem] = useState<Gem>({ id: '', title: '', thumbnail: '', githubUrl: '' });

  useEffect(() => {
    fetchGems();
  }, []);

  const fetchGems = async () => {
    try {
      const result = await backend.getGems();
      setGems(result);
    } catch (error) {
      console.error('Error fetching gems:', error);
    }
  };

  const handleAddGem = async () => {
    try {
      await backend.addGem(newGem);
      setOpenDialog(false);
      setNewGem({ id: '', title: '', thumbnail: '', githubUrl: '' });
      fetchGems();
    } catch (error) {
      console.error('Error adding gem:', error);
    }
  };

  const handleRemoveGem = async (id: string) => {
    try {
      await backend.removeGem(id);
      fetchGems();
    } catch (error) {
      console.error('Error removing gem:', error);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GEM Showcase
          </Typography>
          <Button color="inherit" onClick={() => setOpenDialog(true)}>Add GEM</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {gems.map((gem) => (
            <Grid item key={gem.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={gem.thumbnail || `https://fakeimg.pl/600x400?text=${gem.title}`}
                  alt={gem.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {gem.title}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" href={gem.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</Button>
                  <Button size="small" color="error" onClick={() => handleRemoveGem(gem.id)}>Remove</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New GEM</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="ID"
            fullWidth
            variant="standard"
            value={newGem.id}
            onChange={(e) => setNewGem({ ...newGem, id: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            variant="standard"
            value={newGem.title}
            onChange={(e) => setNewGem({ ...newGem, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Thumbnail URL"
            fullWidth
            variant="standard"
            value={newGem.thumbnail}
            onChange={(e) => setNewGem({ ...newGem, thumbnail: e.target.value })}
          />
          <TextField
            margin="dense"
            label="GitHub URL"
            fullWidth
            variant="standard"
            value={newGem.githubUrl}
            onChange={(e) => setNewGem({ ...newGem, githubUrl: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddGem}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default App;
