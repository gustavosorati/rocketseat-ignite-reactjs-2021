import logoImg from '../../assets/logo.svg';
import { Container, Content } from './styles';

interface HeaderProps {
  onOpenTransactionModal: () => void;
}

export const Header = ({onOpenTransactionModal}: HeaderProps) => {

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <button
          type="button"
          onClick={onOpenTransactionModal}
        >
          Nova Transação
        </button>


      </Content>
    </Container>
  )
}
