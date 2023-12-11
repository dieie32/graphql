import { gql } from '__generated__';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useQuery } from "@apollo/client";
import { Loader } from 'common/components/Loader';
import type { PaginationProps } from 'antd';
import { Button, Card, Layout, Pagination, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title } = Typography;

const QUERY_ALBUMS = gql(/* GraphQL */ `
  query albums {
    albums {
      id
      title
      url
    }
  }
`);

export default function AlbumsPage() {
  const navigate = useNavigate();
  const { loading, data } = useQuery(QUERY_ALBUMS);
  const { albums } = data || {};
  const [currentPage, setCurrentPage] = useState(1);

  const navigateToGallery = (albumId: number) => {
    navigate(`/albums/${albumId}`);
  };

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };

  return (
    <Content className="my-auto mx-3 flex flex-col items-center">
      <Title className="text-center">Albums</Title>

      <section className="w-800-px">
        <Button className="mb-5" type="primary" size="large" icon={<PlusOutlined />}>
          Add Album
        </Button>

        {albums?.length ? (albums.map(({ id, title, url }) => (
          <Card key={id} title={title} className="w-full mb-10">
            <div className="text-center mb-4">
              <img
                className="shadow-xl border-solid border-gray-200 rounded-lg cursor-pointer"
                width={200}
                src={url}
                alt={title}
                onClick={() => navigateToGallery(Number(id))}
              />
            </div>

            <div className="flex justify-between items-center">
              <div>
                Photos: <strong>9</strong>
              </div>
              <div className="flex gap-3">
                <Button type="primary" icon={<EditOutlined />}></Button>
                <Button type="primary" danger icon={<DeleteOutlined />}></Button>
              </div>
            </div>
          </Card>
        ))) : loading && (
          <Loader />
        )}
      </section>

      <Pagination className="text-center" current={currentPage} onChange={onChange} total={50} />
    </Content>
  );
}
