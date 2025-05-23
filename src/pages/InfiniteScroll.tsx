import React, { useEffect, useRef, useCallback } from 'react';
import { Card, Row, Col, Spin, Typography, Empty } from 'antd';
import { useInfiniteDogImages } from '../hooks/useInfiniteDogImages';

/**
 * InfiniteScroll page displays dog images in a grid and loads more on scroll.
 */
const InfiniteScroll: React.FC = () => {
  const { images, loading, error, fetchMore } = useInfiniteDogImages();
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Load initial images
  useEffect(() => {
    fetchMore();
    // eslint-disable-next-line
  }, []);

  // Infinite scroll: load more when loaderRef is visible
  const handleScroll = useCallback(() => {
    if (!loaderRef.current || loading) return;
    const rect = loaderRef.current.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      fetchMore();
    }
  }, [fetchMore, loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div style={{ maxWidth: 900, margin: 'auto', padding: 24 }}>
      {/* Title with full-width background strip */}
      <div style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#ede9fe', padding: '24px 0', marginBottom: 32 }}>
        <Typography.Title level={2} style={{ color: '#7c3aed', textAlign: 'center', margin: 0 }}>Infinite Dog Gallery</Typography.Title>
      </div>
      <Row gutter={[24, 24]} justify="center">
        {images.length === 0 && !loading && <Col span={24}><Empty description="No images" /></Col>}
        {images.map((img, idx) => (
          <Col xs={24} sm={12} md={8} key={img + idx}>
            <Card
              hoverable
              cover={
                <img
                  alt="dog"
                  src={img}
                  style={{ height: 220, objectFit: 'cover', borderRadius: 12, transition: 'box-shadow 0.3s', width: '100%', display: 'block' }}
                  className="dog-img-hover"
                />
              }
              style={{ borderRadius: 16, boxShadow: '0 2px 16px #a78bfa22', padding: 0, height: 220, display: 'flex', alignItems: 'stretch' }}
              bodyStyle={{ padding: 0, height: 0 }}
            />
          </Col>
        ))}
      </Row>
      <div ref={loaderRef} style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {loading && <Spin size="large" />}
        {error && <Typography.Text type="danger">{error}</Typography.Text>}
      </div>
      <style>{`
        .dog-img-hover:hover {
          box-shadow: 0 8px 32px #7c3aed55;
        }
      `}</style>
    </div>
  );
};

export default InfiniteScroll; 