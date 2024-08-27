import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, CardActions, Button, AppBar, Toolbar, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Avatar } from '@mui/material';
import { GitHub, Add } from '@mui/icons-material';
import { backend } from 'declarations/backend';

interface Gem {
  id: string;
  title: string;
  thumbnail: string;
  githubUrl: string;
  description: string;
  author: {
    name: string;
    avatar: string;
  };
}

const App: React.FC = () => {
  const [gems, setGems] = useState<Gem[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newGem, setNewGem] = useState<Gem>({
    id: '',
    title: '',
    thumbnail: '',
    githubUrl: '',
    description: '',
    author: { name: '', avatar: '' }
  });

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
      setNewGem({
        id: '',
        title: '',
        thumbnail: '',
        githubUrl: '',
        description: '',
        author: { name: '', avatar: '' }
      });
      fetchGems();
    } catch (error) {
      console.error('Error adding gem:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #E0E0E0' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            GEM Showcase
          </Typography>
          <Button startIcon={<Add />} onClick={() => setOpenDialog(true)}>Add GEM</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Grid container spacing={4}>
          {gems.map((gem) => (
            <Grid item key={gem.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={gem.thumbnail || `https://fakeimg.pl/600x400?text=${gem.title}`}
                  alt={gem.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 600 }}>
                    {gem.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {gem.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Avatar src={gem.author.avatar} alt={gem.author.name} sx={{ mr: 1 }} />
                    <Typography variant="body2">{gem.author.name}</Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button size="small" startIcon={<GitHub />} href={gem.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</Button>
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
            variant="outlined"
            value={newGem.id}
            onChange={(e) => setNewGem({ ...newGem, id: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            variant="outlined"
            value={newGem.title}
            onChange={(e) => setNewGem({ ...newGem, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Thumbnail URL"
            fullWidth
            variant="outlined"
            value={newGem.thumbnail}
            onChange={(e) => setNewGem({ ...newGem, thumbnail: e.target.value })}
          />
          <TextField
            margin="dense"
            label="GitHub URL"
            fullWidth
            variant="outlined"
            value={newGem.githubUrl}
            onChange={(e) => setNewGem({ ...newGem, githubUrl: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={newGem.description}
            onChange={(e) => setNewGem({ ...newGem, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Author Name"
            fullWidth
            variant="outlined"
            value={newGem.author.name}
            onChange={(e) => setNewGem({ ...newGem, author: { ...newGem.author, name: e.target.value } })}
          />
          <TextField
            margin="dense"
            label="Author Avatar URL"
            fullWidth
            variant="outlined"
            value={newGem.author.avatar}
            onChange={(e) => setNewGem({ ...newGem, author: { ...newGem.author, avatar: e.target.value } })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddGem}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default App;
