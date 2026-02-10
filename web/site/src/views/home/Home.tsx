import Category from '@/components/atoms/category/category';
import { Chip } from '@/components/atoms/Chip/Chip';
import Dish from '@/components/molecules/dish/Dish';
import RestaurantCard from '@/components/molecules/restaurant-card/RestaurantCard';
import { StoreMiniCard } from '@/components/molecules/store-mini-card/StoreMiniCard';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Content, Icon } from 'common-lib';
import Location from '../location/Location';
import './home.scss';
import { useHomePresenter } from './HomePresenter';
import { FabButton } from '@/components/atoms/fab-button/FabButton';

export default function Home() {
  const { categories,
    restaurantes, t,
    dishes, navigate, isSticky, scrollContainerRef,
    chips, locals, openLocations, opens, setOpens } = useHomePresenter();

  return <Content extraClass="home" ref={scrollContainerRef}>

    <div className={`header-search ${isSticky ? 'sticky' : ''}`}>
      <div className='location-home'>
        <Icon name='location_on' type='symbols' />
        <div>
          <p>{t('home.location')}</p>
          <p className='marquee'><span>Este es un texto que se mueve de derecha a izquierda 📍</span></p>
        </div>

        <div onClick={() => {
          openLocations()
        }}>
          <Icon name='keyboard_arrow_down' type='symbols' />
        </div>

      </div>

      <div className='searching' onClick={() => {
        navigate("/advanced-search")
      }}>
        <Icon name='search' />
        <input type="text" placeholder='Buscar en Delivery Aldama...' />
      </div>
    </div>

    <section className='categories'>
      {
        categories.map(c => {
          return <Category icon={c.url} title={c.name} />
        })
      }
    </section>

    <p className='supertitle'>{t("home.restop")}</p>

    <section className='categories'>
      {
        restaurantes.map(r => {
          return <RestaurantCard img={r.img} hasCombos={r.hasCombos} minPrice={r.minPrice} title={r.title} />
        })
      }
    </section>

    <p className='supertitle'>{t("home.sell")}</p>

    <section className='categories'>
      {
        dishes.map(d => {
          return <Dish img={d.img} price={d.price} offerPrice={d.offerPrice} title={d.title} />
        })
      }
    </section>

    <section className='categories minicats'>
      {
        chips.map((c, idx) => {
          return <Chip text={c.name} key={`${c.name}-${idx}`} />
        })
      }
    </section>

    <section className='locals'>
      {
        locals.map((l, idx) => {
          return <StoreMiniCard
            title={l.title}
            key={`${l.title}-${idx}`}
            img={l.img}
            kms={l.kms}
            time={l.time}
            extraComponent={l.component} />
        })
      }
    </section>
    <SwipeableDrawer
      anchor="bottom"
      open={opens}
      onClose={() => { setOpens(false) }}
      onOpen={() => { }}
      PaperProps={{
        className: 'my-custom-bottom-modal'
      }}
    >
      <div className="modal-sticky-header">
        <h3>{t("location.title")}</h3>
      </div>

      <Location />
    </SwipeableDrawer>
  </Content>
}
