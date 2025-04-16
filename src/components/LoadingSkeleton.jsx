import React from "react";
import { Grid, Skeleton } from "@mui/material";

const LoadingSkeleton = () => (
  <>
    {[1, 2, 3, 4].map((item) => (
      <Grid item xs={12} md={6} lg={4} key={item}>
        <Skeleton 
          variant="rectangular" 
          height={500} 
          sx={{ backgroundColor: "#2a2a2a", borderRadius: 2 }} 
        />
      </Grid>
    ))}
  </>
);

export default LoadingSkeleton;