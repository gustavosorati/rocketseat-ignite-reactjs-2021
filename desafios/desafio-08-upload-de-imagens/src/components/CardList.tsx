import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const { isOpen, onOpen, onClose } = useDisclosure();

  // TODO SELECTED IMAGE URL STATE
  const [imageURLState, setImageURLState] = useState(false);
  const [urlImage, setUrlImage] = useState('');

  // // TODO FUNCTION HANDLE VIEW IMAGE
  function handleViewImage(card: Card): string {
    if (imageURLState === false) {
      onOpen();
      setImageURLState(false);
      setUrlImage(card.url);
    }

    if (imageURLState === true) {
      onClose();
      setImageURLState(true);
    }

    return card.url;
  }

  return (
    <>
      <SimpleGrid columns={3} spacing="40px">
        {cards.map(card => (
          <Card
            key={card.id}
            data={card}
            viewImage={() => handleViewImage(card)}
          />
        ))}
      </SimpleGrid>

      {/* TODO MODALVIEWIMAGE */}
      {isOpen && (
        <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={urlImage} />
      )}
    </>
  );
}
