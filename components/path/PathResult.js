import {
  List,
  ListItem,
  Typography,
  ListItemText,
  Divider,
  Chip,
  Box,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function PathResult({ pathResult }) {
  return (
    <Box>
      <List>
        <Typography variant="h6" sx={{ mt: 1, ml: 1 }}>
          검색 결과
        </Typography>
        <ListItem sx={{ px: 1 }}>
          <ListItemText>거리: {pathResult.distance}km</ListItemText>
          <ListItemText>요금: {pathResult.fare}원</ListItemText>
        </ListItem>
      </List>
      <Divider />
      <Box sx={{ mt: 1 }}>
        {pathResult.stations?.map((station, index) => (
          <span key={station.id} data-cy="path-result-station">
            <Chip label={station.name} sx={{ mx: 1 }} />
            {index < pathResult.stations.length - 1 && (
              <ArrowForwardIcon sx={{ position: "relative", top: "6px" }} />
            )}
          </span>
        ))}
      </Box>
    </Box>
  );
}
