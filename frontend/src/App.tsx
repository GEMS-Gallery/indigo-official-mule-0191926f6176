import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, CardActions, Button, AppBar, Toolbar, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Avatar, Tabs, Tab } from '@mui/material';
import { GitHub, Add, ForkRight, Star, Comment } from '@mui/icons-material';
import { backend } from 'declarations/backend';

interface Gem {
  id: string;
  title: string;
  thumbnail: string;
  githubUrl: string;
  author: {
    name: string;
    avatar: string;
  };
  featured: boolean;
  createdAt: bigint;
}

const App: React.FC = () => {
  const [gems, setGems] = useState<Gem[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newGem, setNewGem] = useState<Gem>({
    id: '',
    title: '',
    thumbnail: '',
    githubUrl: '',
    author: { name: '', avatar: '' },
    featured: false,
    createdAt: BigInt(0)
  });
  const [tabValue, setTabValue] = useState(0);

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
        author: { name: '', avatar: '' },
        featured: false,
        createdAt: BigInt(0)
      });
      fetchGems();
    } catch (error) {
      console.error('Error adding gem:', error);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const filteredGems = tabValue === 0
    ? gems.filter(gem => gem.featured)
    : [...gems].sort((a, b) => Number(b.createdAt - a.createdAt));

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
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="gem tabs">
            <Tab label="Featured" />
            <Tab label="Latest" />
          </Tabs>
        </Box>
        <Grid container spacing={4}>
          {filteredGems.map((gem) => (
            <Grid item key={gem.id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={gem.thumbnail || `https://fakeimg.pl/600x400?text=${gem.title}`}
                  alt={gem.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 600 }}>
                      {gem.title}
                    </Typography>
                    {gem.featured && <Star color="primary" />}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Avatar src={gem.author.avatar} alt={gem.author.name} sx={{ mr: 1 }} />
                    <Typography variant="body2">{gem.author.name}</Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button size="small" startIcon={<GitHub />} href={gem.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</Button>
                  <Button size="small" startIcon={<ForkRight />} href={`${gem.githubUrl}/fork`} target="_blank" rel="noopener noreferrer">Fork this project</Button>
                  <Button size="small" startIcon={<Comment />}>Comment</Button>
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
