import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, CardActions, Button, AppBar, Toolbar, Box, Avatar, Chip, List, ListItem, ListItemText } from '@mui/material';
import { GitHub, RocketLaunch, School, Star } from '@mui/icons-material';
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
  category: string;
}

const categories = ['All', 'Retail', 'SaaS', 'Legal'];

const App: React.FC = () => {
  const [gems, setGems] = useState<Gem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

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

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredGems = selectedCategory === 'All'
    ? gems
    : gems.filter(gem => gem.category === selectedCategory);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f7f9fc' }}>
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #E0E0E0', bgcolor: 'white' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, color: '#333' }}>
            GEM's Showcase
          </Typography>
          <Button startIcon={<RocketLaunch />} href="https://gems.xyz" target="_blank" rel="noopener noreferrer" sx={{ mr: 2, color: '#333' }}>
            Start Building
          </Button>
          <Button startIcon={<School />} href="https://gems.xyz/learn" target="_blank" rel="noopener noreferrer" sx={{ color: '#333' }}>
            Learn
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1, display: 'flex' }}>
        <Box sx={{ width: '200px', mr: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#333', fontWeight: 600 }}>Categories</Typography>
          <List>
            {categories.map((category) => (
              <ListItem
                key={category}
                button
                selected={category === selectedCategory}
                onClick={() => handleCategorySelect(category)}
                sx={{
                  borderRadius: '8px',
                  mb: 1,
                  '&.Mui-selected': {
                    backgroundColor: '#e3f2fd',
                    color: '#1976d2',
                  },
                }}
              >
                <ListItemText primary={category} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4}>
            {filteredGems.map((gem) => (
              <Grid item key={gem.id} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 6px 12px rgba(0,0,0,0.15)' } }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={gem.thumbnail || `https://fakeimg.pl/600x400?text=${gem.title}`}
                    alt={gem.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 600, color: '#333' }}>
                        {gem.title}
                      </Typography>
                      {gem.featured && <Star sx={{ color: '#FFD700', fontSize: 28 }} />}
                    </Box>
                    <Chip label={gem.category} size="small" sx={{ mb: 1, bgcolor: '#e3f2fd', color: '#1976d2' }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      <Avatar src={gem.author.avatar} alt={gem.author.name} sx={{ mr: 1, width: 32, height: 32 }} />
                      <Typography variant="body2" sx={{ color: '#666' }}>{gem.author.name}</Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button size="small" startIcon={<GitHub />} href={gem.githubUrl} target="_blank" rel="noopener noreferrer" sx={{ color: '#333' }}>View on GitHub</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default App;
