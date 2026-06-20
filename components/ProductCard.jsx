"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import DeleteButton from "./DeleteButton";
import ProductQuickActions from "./ProductQuickActions";

export default function ProductCard({ product, labels }) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        transition: "transform 180ms ease, box-shadow 180ms ease",
        "&:hover": {
          boxShadow: "0 18px 45px rgba(15, 23, 42, 0.12)",
          transform: "translateY(-4px)",
        },
      }}
    >
      <Box sx={{ bgcolor: "#f5f7fb", p: 2, position: "relative" }}>
        <ProductQuickActions product={product} labels={labels} />

        <CardMedia
          component="img"
          image={product.thumbnail}
          alt={product.title}
          sx={{
            aspectRatio: "4 / 3",
            height: 180,
            objectFit: "contain",
            mixBlendMode: "multiply",
          }}
        />
      </Box>

      <CardContent>
        <Stack spacing={2}>
          <Stack spacing={1}>
            <Chip
              label={product.localizedCategory ?? labels.product}
              size="small"
              sx={{ alignSelf: "flex-start", textTransform: "capitalize" }}
            />

            <Typography
              component="h3"
              variant="h6"
              sx={{ minHeight: 64, fontWeight: 800, lineHeight: 1.25 }}
            >
              {product.title}
            </Typography>

            <Typography variant="h5" color="primary" sx={{ fontWeight: 900 }}>
              ${product.price}
            </Typography>
          </Stack>

          <Stack direction="row" flexWrap="wrap" gap={1}>
            <Button
              href={`/products/${product.id}`}
              size="small"
              variant="contained"
            >
              {labels.view}
            </Button>

            <Button
              href={`/products/${product.id}/edit`}
              size="small"
              variant="text"
            >
              {labels.edit}
            </Button>

            <DeleteButton
              id={product.id}
              label={labels.delete}
              errorLabel={labels.deleteError}
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}










// "use client";

// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   CardMedia,
//   Chip,
//   Stack,
//   Typography,
// } from "@mui/material";
// import DeleteButton from "./DeleteButton";
// import ProductQuickActions from "./ProductQuickActions";

// export default function ProductCard({ product, labels }) {
//   return (
//     <Card
//       elevation={0}
//       sx={{
//         height: "100%",
//         overflow: "hidden",
//         border: "1px solid",
//         borderColor: "divider",
//         borderRadius: 2,
//         transition: "transform 180ms ease, box-shadow 180ms ease",
//         "&:hover": {
//           boxShadow: "0 18px 45px rgba(15, 23, 42, 0.12)",
//           transform: "translateY(-4px)",
//         },
//       }}
//     >
//       <Box sx={{ bgcolor: "#f5f7fb", p: 2, position: "relative" }}>
//         <ProductQuickActions product={product} labels={labels} />
//         <CardMedia
//           component="img"
//           image={product.thumbnail}
//           alt={product.title}
//           sx={{
//             aspectRatio: "4 / 3",
//             height: 180,
//             objectFit: "contain",
//             mixBlendMode: "multiply",
//           }}
//         />
//       </Box>

//       <CardContent>
//         <Stack spacing={2}>
//           <Stack spacing={1}>
//             <Chip
//               label={product.localizedCategory ?? labels.product}
//               size="small"
//               sx={{ alignSelf: "flex-start", textTransform: "capitalize" }}
//             />
//             <Typography
//               component="h3"
//               variant="h6"
//               sx={{ minHeight: 64, fontWeight: 800, lineHeight: 1.25 }}
//             >
//               {product.title}
//             </Typography>
//             <Typography variant="h5" color="primary" sx={{ fontWeight: 900 }}>
//               ${product.price}
//             </Typography>
//           </Stack>

//           <Stack direction="row" flexWrap="wrap" gap={1}>
//             <Button
//               href={`/products/${product.id}`}
//               size="small"
//               variant="contained"
//             >
//               {labels.view}
//             </Button>
//             <Button
//               href={`/products/${product.id}/edit`}
//               size="small"
//               variant="text"
//             >
//               {labels.edit}
//             </Button>
//             <DeleteButton
//               id={product.id}
//               label={labels.delete}
//               errorLabel={labels.deleteError}
//             />
//           </Stack>
//         </Stack>
//       </CardContent>
//     </Card>
//   );
// }
