import React from "react";
import { useParams } from "react-router-dom";
import { getProduct, getProducts } from "../services/ProductsApi";
import StarRatingComponent from "../components/StarRatingComponent";
import "./ProductDetailPage.css";
import GridProductsComponent from "../components/GridProductsComponent";
import CommentsComponent from "../components/CommentsComponent";
import CategoriesProductComponent from "../components/CategoriesProductComponent";
import { useDispatch } from "react-redux";
import { addCartItem } from "../app/features/cartSlice";
import toast from "react-hot-toast";

function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const [listProductProviders, setListProductProviders] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [added, setAdded] = React.useState(false);

  const dispatch = useDispatch();
  const comments = [
    { comment: "Calidad precio.", rating: 4, date: "2026-04-13" },
    {
      comment: "Es buen producto,lo recomiendo.",
      rating: 5,
      date: "2025-01-24",
    },
  ];

  React.useEffect(() => {
    setIsLoading(true);
    setImages([]);
    setQuantity(1);
    getProduct({ slug: slug })
      .then((response) => {
        setImages([response.data.data.url_image]);
        setProduct(response.data.data);
      })
      .catch((error) => console.log(error, "error"))
      .finally(() => setIsLoading(false));
  }, [slug]);

  const slugProduct = React.useMemo(() => {
    return product?.provider?.slug;
  }, [product]);

  React.useEffect(() => {
    if (slugProduct) {
      getProducts({ size_items: 6, page: 1, provider_slug: slugProduct })
        .then((response) => {
          const products = response.data.data;
          if (products.length > 0) {
            const filterProduct = products.filter((p) => p.id != product.id);
            setListProductProviders(filterProduct);
          }
        })
        .catch((error) => console.log(error, "error"));
    }
  }, [slugProduct, product]);

  const finalPrice = React.useMemo(() => {
    const price = product?.price || "0";
    return price * quantity;
  }, [product, quantity]);

  const formatPrice = (price) =>
    parseFloat(price).toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
    });

  const onAddCart = () => {
    const uid = crypto.randomUUID();

    const itemCart = {
      productId: product.id,
      slug: product.slug,
      url_image: product.url_image,
      price: finalPrice,
      quantity: quantity,
      name: product.name,
      productPrice: product.price,
      uid,
    };
    dispatch(addCartItem({ [uid]: itemCart }));
    toast.success(
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src={product.url_image}
          style={{ width: 40, height: 40, borderRadius: 6, objectFit: "cover" }}
        />
        <span>
          <b>{product.name}</b> agregado al carrito
        </span>
      </div>,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 600);
  };

  if (isLoading) return <div className="product-loading">Cargando...</div>;
  if (!product)
    return <div className="product-not-found">Producto no encontrado</div>;

  return (
    <div className="product-page">
      {/* Imágenes */}
      <div className="product-images">
        <div className="product-thumbnails">
          {images?.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${product.name} ${i}`}
              className={`thumbnail ${selectedImage === i ? "active" : ""}`}
              onClick={() => setSelectedImage(i)}
            />
          ))}
        </div>
        <div className="product-main-image">
          <img
            src={images[selectedImage] ?? product.url_image}
            alt={product.name}
          />
        </div>
      </div>

      {/* Info */}
      <div className="product-info">
        <p className="product-title">{product.name}</p>
        <CategoriesProductComponent
          provider={product.provider}
          categories={product.categories}
        />
        {/* <p className="product-provider">{product.provider?.name}</p> */}

        <div className="product-rating">
          <StarRatingComponent rating={product.rating ?? 4} />
          <span>({product.reviews ?? 0} reseñas)</span>
        </div>
        {/* Cantidad */}
        <div className="product-quantity">
          <button
            className="btn-quantity"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            −
          </button>
          <span>{quantity}</span>
          <button
            className="btn-quantity"
            onClick={() => setQuantity((q) => q + 1)}
          >
            +
          </button>
        </div>
        {/* Detalles extra */}
        <div className="product-details">
          <div className="product-detail-item">
            <span>Precio</span>
            <span className="product-price">{formatPrice(finalPrice)}</span>
          </div>
          <div className="product-detail-item">
            <span>SKU</span>
            <span>{product.sku ?? "N/A"}</span>
          </div>
          <div className="product-detail-item">
            <span>Disponibilidad</span>
            <span className={product.stock > 0 ? "in-stock" : "out-stock"}>
              {product.stock > 0 ? `${product.stock} en stock` : "Sin stock"}
            </span>
          </div>
        </div>
        {/* Botones */}
        <div className="product-actions">
          <button
            type="button"
            className={`btn-add-cart ${added ? "added" : ""}`}
            onMouseDown={onAddCart}
          >
            {added ? "✓ Agregado" : "Agregar al carrito"}{" "}
          </button>
          <button type="button" className="btn-buy-now">
            Comprar ahora
          </button>
        </div>
      </div>
      <div className="description-product">
        <span className="title-product-section">Descripción</span>
        <ProductDescription description={product.description} />
      </div>
      <div className="relate-section-product">
        <span className="title-product-section">Productos relacionados</span>
        <GridProductsComponent
          listProducts={listProductProviders}
          numColums={3}
        />
      </div>
      <div className="comment-section-product">
        <span className="title-product-section">Comentarios</span>
        <CommentsComponent listComments={comments} />
      </div>
    </div>
  );
}

const ProductDescription = ({ description = "" }) => {
  const [expanded, setExpanded] = React.useState(false);
  const MAX_LENGTH = 300;
  const isLong = description.length > MAX_LENGTH;

  return (
    <div className="product-description">
      <p
        className={`description-text ${!expanded && isLong ? "collapsed" : ""}`}
      >
        {description}
      </p>
      {isLong && (
        <button
          className="description-toggle"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Ver menos ▲" : "Ver más ▼"}
        </button>
      )}
    </div>
  );
};

export default ProductDetailPage;
