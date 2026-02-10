
import Icon from './../../../components/atoms/icon/Icon'
import './header.scss'
import SquareButton from './../../..//components/molecules/square_button/SquareButton'
export default function Header({ isMobile = false, onClickOpenMenu = () => {

} }) {
    return <header className='as-header'>

        {
            isMobile && <SquareButton onClick={onClickOpenMenu}>
                <Icon name='menu' />
            </SquareButton>
        }

        <input placeholder="Buscar..." className="search-input" />

        <div className="header-icons">


            <SquareButton onClick={() => { }}>
                <Icon name='notifications' />
            </SquareButton>

            <SquareButton onClick={() => { }}>
                <Icon name='person' />
            </SquareButton>

            <SquareButton onClick={() => { }}>
                <Icon name='settings' />
            </SquareButton>


        </div>
    </header>
}