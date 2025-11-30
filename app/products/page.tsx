'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  TextField, 
  InputAdornment, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button, 
  Box, 
  Rating,
  Chip,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  Slider,
  IconButton,
  Drawer,
  Divider,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Alert,
  Collapse,
  Tooltip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import InventoryIcon from '@mui/icons-material/Inventory';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import StorefrontIcon from '@mui/icons-material/Storefront';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useProductStore, Product } from '../../store/productStore';
import { useCartStore, CartItem } from '../../store/cartStore';

export default function ProductsPage() {
  const { products, categories } = useProductStore();
  const { addItem } = useCartStore();
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('default');
  const [priceRange, setPriceRange] = useState<number[]>([0, 200]);
  const [showFilters, setShowFilters] = useState(false);
  const [showInfoBanner, setShowInfoBanner] = useState(true);

  // Calcular rango de precios máximo
  const maxPrice = Math.max(...products.map(p => p.price));

  // Filtrar y ordenar productos
  useEffect(() => {
    let result = [...products];
    
    // Filtrar por categoría
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filtrar por búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(term) ||
        product.description?.toLowerCase().includes(term)
      );
    }

    // Filtrar por rango de precio
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Ordenar
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        result.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, searchTerm, products, sortBy, priceRange]);

  const handleAddToCart = (product: Product) => {
    const discountedPrice = product.discountPercent 
      ? product.price * (1 - product.discountPercent/100) 
      : product.price;
    
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: discountedPrice,
      quantity: 1,
      image: product.image,
    };
    addItem(cartItem);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSearchTerm('');
    setPriceRange([0, maxPrice]);
    setSortBy('default');
  };

  const activeFiltersCount = [
    selectedCategory,
    searchTerm,
    priceRange[0] > 0 || priceRange[1] < maxPrice,
    sortBy !== 'default'
  ].filter(Boolean).length;

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Banner informativo */}
        <Collapse in={showInfoBanner}>
          <Alert 
            severity="info" 
            icon={<StorefrontIcon />}
            action={
              <IconButton size="small" onClick={() => setShowInfoBanner(false)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            }
            sx={{ 
              mb: 3, 
              borderRadius: 2,
              bgcolor: 'primary.50',
              border: '1px solid',
              borderColor: 'primary.200'
            }}
          >
            <Typography variant="body2">
              <strong>Vista de demostración:</strong> Así es como tus clientes verán tu catálogo de productos. 
              Cada tienda puede personalizar sus productos, precios y categorías.
            </Typography>
          </Alert>
        </Collapse>

        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
            <InventoryIcon sx={{ fontSize: 40, color: 'primary.main' }} />
            <Box>
              <Typography variant="h4" component="h1" fontWeight="bold">
                Catálogo de Productos
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Vista previa de cómo tus clientes explorarán tu inventario
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Barra de herramientas principal */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 2, 
            mb: 3, 
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Grid container spacing={2} alignItems="center">
            {/* Búsqueda */}
            <Grid size={{ xs: 12, md: 5 }}>
              <TextField
                fullWidth
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: 2,
                    bgcolor: 'white'
                  }
                }}
              />
            </Grid>

            {/* Categoría */}
            <Grid size={{ xs: 6, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Categoría</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  label="Categoría"
                  sx={{ borderRadius: 2, bgcolor: 'white' }}
                >
                  <MenuItem value="">Todas</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Ordenar */}
            <Grid size={{ xs: 6, md: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Ordenar</InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  label="Ordenar"
                  sx={{ borderRadius: 2, bgcolor: 'white' }}
                >
                  <MenuItem value="default">Relevancia</MenuItem>
                  <MenuItem value="price-low">Precio: Menor a Mayor</MenuItem>
                  <MenuItem value="price-high">Precio: Mayor a Menor</MenuItem>
                  <MenuItem value="rating">Mejor Valorados</MenuItem>
                  <MenuItem value="discount">Mayor Descuento</MenuItem>
                  <MenuItem value="name">Nombre A-Z</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Acciones */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Stack direction="row" spacing={1} justifyContent={{ xs: 'space-between', md: 'flex-end' }}>
                {/* Botón filtros móvil */}
                <Button
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                  onClick={() => setShowFilters(true)}
                  sx={{ 
                    borderRadius: 2,
                    display: { xs: 'flex', md: 'none' }
                  }}
                >
                  Filtros {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                </Button>

                {/* Toggle vista */}
                <ToggleButtonGroup
                  value={viewMode}
                  exclusive
                  onChange={(e, value) => value && setViewMode(value)}
                  size="small"
                >
                  <ToggleButton value="grid" sx={{ px: 2 }}>
                    <Tooltip title="Vista mosaico">
                      <ViewModuleIcon />
                    </Tooltip>
                  </ToggleButton>
                  <ToggleButton value="list" sx={{ px: 2 }}>
                    <Tooltip title="Vista lista">
                      <ViewListIcon />
                    </Tooltip>
                  </ToggleButton>
                </ToggleButtonGroup>

                {/* Limpiar filtros */}
                {activeFiltersCount > 0 && (
                  <Button
                    variant="text"
                    color="error"
                    size="small"
                    onClick={clearFilters}
                    sx={{ display: { xs: 'none', md: 'flex' } }}
                  >
                    Limpiar
                  </Button>
                )}
              </Stack>
            </Grid>
          </Grid>

          {/* Filtros de precio (desktop) */}
          <Box sx={{ mt: 2, display: { xs: 'none', md: 'block' } }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                Rango de precio:
              </Typography>
              <Box sx={{ flex: 1, maxWidth: 300 }}>
                <Slider
                  value={priceRange}
                  onChange={(e, newValue) => setPriceRange(newValue as number[])}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `$${value}`}
                  min={0}
                  max={Math.ceil(maxPrice / 10) * 10}
                  sx={{ color: 'primary.main' }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                ${priceRange[0]} - ${priceRange[1]}
              </Typography>
            </Stack>
          </Box>
        </Paper>

        {/* Resultados info */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Mostrando <strong>{filteredProducts.length}</strong> de <strong>{products.length}</strong> productos
          </Typography>
          {selectedCategory && (
            <Chip 
              label={selectedCategory}
              onDelete={() => setSelectedCategory('')}
              size="small"
              color="primary"
            />
          )}
        </Stack>

        {/* Productos */}
        {filteredProducts.length === 0 ? (
          <Paper 
            elevation={0} 
            sx={{ 
              p: 6, 
              textAlign: 'center',
              borderRadius: 3,
              bgcolor: 'white',
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <SearchIcon sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              No se encontraron productos
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Intenta cambiar tus filtros o términos de búsqueda.
            </Typography>
            <Button
              variant="contained"
              onClick={clearFilters}
            >
              Ver todos los productos
            </Button>
          </Paper>
        ) : viewMode === 'grid' ? (
          // Vista Mosaico
          <Grid container spacing={2}>
            {filteredProducts.map((product) => (
              <Grid key={product.id} size={{ xs: 6, sm: 4, md: 3, lg: 2.4 }}>
                <ProductCardGrid product={product} onAddToCart={handleAddToCart} />
              </Grid>
            ))}
          </Grid>
        ) : (
          // Vista Lista
          <Stack spacing={2}>
            {filteredProducts.map((product) => (
              <ProductCardList key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </Stack>
        )}
      </Container>

      {/* Drawer de filtros móvil */}
      <Drawer
        anchor="bottom"
        open={showFilters}
        onClose={() => setShowFilters(false)}
        PaperProps={{
          sx: { borderTopLeftRadius: 16, borderTopRightRadius: 16, maxHeight: '70vh' }
        }}
      >
        <Box sx={{ p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">Filtros</Typography>
            <IconButton onClick={() => setShowFilters(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Typography variant="subtitle2" gutterBottom>Rango de precio</Typography>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue as number[])}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `$${value}`}
            min={0}
            max={Math.ceil(maxPrice / 10) * 10}
            sx={{ mb: 3 }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            ${priceRange[0]} - ${priceRange[1]}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Stack direction="row" spacing={2}>
            <Button 
              variant="outlined" 
              fullWidth 
              onClick={() => { clearFilters(); setShowFilters(false); }}
            >
              Limpiar
            </Button>
            <Button 
              variant="contained" 
              fullWidth 
              onClick={() => setShowFilters(false)}
            >
              Aplicar
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </Box>
  );
}

// Componente de tarjeta para vista mosaico
function ProductCardGrid({ product, onAddToCart }: { product: Product; onAddToCart: (p: Product) => void }) {
  const discountedPrice = product.discountPercent 
    ? product.price * (1 - product.discountPercent/100) 
    : product.price;

  return (
    <Card 
      sx={{ 
        height: '100%',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
        }
      }}
    >
      <CardActionArea component={Link} href={`/products/${product.id}`}>
        <Box sx={{ position: 'relative', pt: '100%', bgcolor: 'grey.50' }}>
          <CardMedia
            component="div"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2
            }}
          >
            <Image
              src={product.image}
              alt={product.name}
              width={120}
              height={120}
              style={{ objectFit: 'contain' }}
            />
          </CardMedia>
          
          {(product.discountPercent ?? 0) > 0 && (
            <Chip
              label={`-${product.discountPercent}%`}
              color="error"
              size="small"
              sx={{ position: 'absolute', top: 8, left: 8, fontWeight: 'bold' }}
            />
          )}
        </Box>
        
        <CardContent sx={{ p: 1.5 }}>
          <Typography variant="body2" noWrap fontWeight="600" gutterBottom>
            {product.name}
          </Typography>
          
          <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 0.5 }}>
            <Rating value={product.rating} precision={0.5} size="small" readOnly />
            <Typography variant="caption" color="text.secondary">
              ({product.rating})
            </Typography>
          </Stack>
          
          <Stack direction="row" alignItems="baseline" spacing={1}>
            <Typography variant="subtitle1" color="primary.main" fontWeight="bold">
              ${discountedPrice.toFixed(2)}
            </Typography>
            {(product.discountPercent ?? 0) > 0 && (
              <Typography variant="caption" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                ${product.price.toFixed(2)}
              </Typography>
            )}
          </Stack>
        </CardContent>
      </CardActionArea>
      
      <Box sx={{ p: 1.5, pt: 0 }}>
        <Button
          variant="contained"
          size="small"
          fullWidth
          startIcon={<ShoppingCartIcon />}
          onClick={(e) => { e.preventDefault(); onAddToCart(product); }}
          sx={{ borderRadius: 1.5 }}
        >
          Agregar
        </Button>
      </Box>
    </Card>
  );
}

// Componente de tarjeta para vista lista
function ProductCardList({ product, onAddToCart }: { product: Product; onAddToCart: (p: Product) => void }) {
  const discountedPrice = product.discountPercent 
    ? product.price * (1 - product.discountPercent/100) 
    : product.price;

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 2,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 3, sm: 2 }}>
          <Box 
            sx={{ 
              position: 'relative',
              width: '100%',
              aspectRatio: '1/1',
              bgcolor: 'grey.50',
              borderRadius: 2,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Image
              src={product.image}
              alt={product.name}
              width={80}
              height={80}
              style={{ objectFit: 'contain' }}
            />
            {(product.discountPercent ?? 0) > 0 && (
              <Chip
                label={`-${product.discountPercent}%`}
                color="error"
                size="small"
                sx={{ 
                  position: 'absolute', 
                  top: 4, 
                  left: 4, 
                  fontSize: '0.65rem',
                  height: 20
                }}
              />
            )}
          </Box>
        </Grid>
        
        <Grid size={{ xs: 9, sm: 6 }}>
          <Link href={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="subtitle1" fontWeight="600" sx={{ '&:hover': { color: 'primary.main' } }}>
              {product.name}
            </Typography>
          </Link>
          <Typography variant="body2" color="text.secondary" noWrap>
            {product.description}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5 }}>
            <Rating value={product.rating} precision={0.5} size="small" readOnly />
            <Chip label={product.category} size="small" variant="outlined" />
          </Stack>
        </Grid>
        
        <Grid size={{ xs: 12, sm: 4 }}>
          <Stack direction={{ xs: 'row', sm: 'column' }} spacing={1} alignItems={{ xs: 'center', sm: 'flex-end' }}>
            <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
              <Typography variant="h6" color="primary.main" fontWeight="bold">
                ${discountedPrice.toFixed(2)}
              </Typography>
              {(product.discountPercent ?? 0) > 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                  ${product.price.toFixed(2)}
                </Typography>
              )}
            </Box>
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                size="small"
                component={Link}
                href={`/products/${product.id}`}
                startIcon={<VisibilityIcon />}
                sx={{ borderRadius: 1.5 }}
              >
                Ver
              </Button>
              <Button
                variant="contained"
                size="small"
                startIcon={<ShoppingCartIcon />}
                onClick={() => onAddToCart(product)}
                sx={{ borderRadius: 1.5 }}
              >
                Agregar
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}
