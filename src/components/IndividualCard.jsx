import React from 'react';
import { 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  Chip, 
  Box, 
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { highlightMatch } from '../utils/highlightMatch';

const StyledCard = styled(Card)(({ theme, completed }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.2s',
  opacity: completed ? 0.8 : 1,
  backgroundColor: completed ? theme.palette.grey[50] : theme.palette.background.paper,
  '&:hover': {
    boxShadow: theme.shadows[4],
    borderColor: theme.palette.primary.main,
  },
}));

const DifficultyChip = styled(Chip)(({ difficulty }) => {
  const colorMap = {
    beginner: 'success',
    intermediate: 'warning',
    advanced: 'error',
  };
  
  return {
    textTransform: 'capitalize',
    color: 'white',
    backgroundColor: colorMap[difficulty?.toLowerCase()] 
      ? '' 
      : 'rgba(0, 0, 0, 0.08)',
  };
});

const formatDate = (iso) => {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-GB', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  } catch {
    return iso;
  }
};
const formatTime = (mins) => {
  if (!mins) return '0 min';
  return `${mins} min${mins !== 1 ? 's' : ''}`;
};

export default function IndividualCard({ 
  session, 
  onToggle,
  searchQuery = ''
}) {
  const { 
    id,
    title, 
    tags = [], 
    mins = 0, 
    difficulty = 'N/A', 
    popularity, 
    updatedAt, 
    completed = false 
  } = session;

  const handleToggle = (e) => {
    e.stopPropagation();
    onToggle();
  };

  return (
    <StyledCard 
      variant="outlined"
      completed={completed}
      // aria-posinset={ariaPosInSet}
      // aria-setsize={ariaSetSize}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-meta`}
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleToggle(e)}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box mb={1}>
          <Typography 
            id={`${id}-title`}
            variant="h6" 
            component="h3"
            gutterBottom
            sx={{ 
              fontWeight: 600,
              textDecoration: completed ? 'line-through' : 'none'
            }}
          >
            {searchQuery ? highlightMatch(title, searchQuery) : title}
          </Typography>
          
          <Box 
            id={`${id}-meta`}
            display="flex" 
            flexWrap="wrap" 
            gap={1.5}
            alignItems="center"
            mb={1.5}
            color="text.secondary"
          >
            <Typography variant="body2">{formatTime(mins)}</Typography>
            <DifficultyChip 
              label={difficulty} 
              size="small"
              difficulty={difficulty?.toLowerCase()}
            />
            <Typography variant="body2">
              {popularity} {popularity === 1 ? 'view' : 'views'}
            </Typography>
          </Box>
        </Box>

        {tags?.length > 0 && (
          <Box 
            display="flex" 
            flexWrap="wrap" 
            gap={0.5} 
            mb={updatedAt ? 1.5 : 0}
            aria-label="Tags"
          >
            {tags.map((tag) => (
              <Chip 
                key={tag} 
                label={tag}
                size="small"
                variant="outlined"
                aria-label={`Tag: ${tag}`}
              />
            ))}
          </Box>
        )}

        {updatedAt && (
          <Typography 
            variant="caption" 
            color="text.secondary"
            component="div"
            sx={{ 
              mt: 1, 
              pt: 1, 
              borderTop: '1px dashed', 
              borderColor: 'divider' 
            }}
          >
            Updated: {formatDate(updatedAt)}
          </Typography>
        )}
      </CardContent>

      <Divider />
      <CardActions sx={{ p: 1.5 }}>
        <Button
          fullWidth
          size="small"
          onClick={handleToggle}
          startIcon={completed ? '✓' : '+'}
          color={completed ? 'success' : 'primary'}
          variant={completed ? 'contained' : 'outlined'}
          sx={{ textTransform: 'none' }}
          aria-pressed={completed}
        >
          {completed ? 'Completed' : 'Mark as completed'}
        </Button>
      </CardActions>
    </StyledCard>
  );
}
