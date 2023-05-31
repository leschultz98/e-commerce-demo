import PhoneIcon from '@mui/icons-material/Phone';
import { useEffect, useState } from 'react';
import { getLocalData, setLocalData } from '../utils';
import EditWrapper from './EditWrapper.tsx';

const IMAGE = 'https://binbadecor.vn/wp-content/uploads/2022/03/thiet-ke-shop-quan-ao-2.jpg';
const NAME = 'Lorem ipsum dolor sit';
const DESCRIPTION =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium at error eum exercitationem harum ipsam magnam magni minima, neque nesciunt, officia pariatur perspiciatis quasi quia quis sequi ullam ut vel.';
const PHONE = '09x-xxxxxxx';

const STORE_IMAGE = 'storeImage';
const STORE_NAME = 'storeName';
const STORE_DESCRIPTION = 'storeDescription';
const STORE_PHONE = 'storePhone';

export default function SellerInfo() {
  const [image, setImage] = useState(IMAGE);
  const [name, setName] = useState(NAME);
  const [description, setDescription] = useState(DESCRIPTION);
  const [phone, setPhone] = useState(PHONE);

  useEffect(() => {
    const image = getLocalData(STORE_IMAGE);
    if (image) setImage(image);
    const name = getLocalData(STORE_NAME);
    if (name) setName(name);
    const description = getLocalData(STORE_DESCRIPTION);
    if (description) setDescription(description);
    const phone = getLocalData(STORE_PHONE);
    if (phone) setPhone(phone);
  }, []);

  return (
    <section>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <EditWrapper
            initValue={image}
            save={(v) => {
              setImage(v);
              setLocalData(STORE_IMAGE, v);
            }}
          >
            <img src={image} alt="Shop" />
          </EditWrapper>
        </figure>

        <div className="card-body">
          <h2 className="card-title text-secondary">
            <EditWrapper
              initValue={name}
              save={(v) => {
                setName(v);
                setLocalData(STORE_NAME, v);
              }}
            >
              <span>{name}</span>
            </EditWrapper>
          </h2>

          <EditWrapper
            initValue={description}
            save={(v) => {
              setDescription(v);
              setLocalData(STORE_DESCRIPTION, v);
            }}
          >
            <p>{description}</p>
          </EditWrapper>

          <p className="text-accent">
            <PhoneIcon />
            <EditWrapper
              initValue={phone}
              save={(v) => {
                setPhone(v);
                setLocalData(STORE_PHONE, v);
              }}
            >
              {phone}
            </EditWrapper>
          </p>
        </div>
      </div>
    </section>
  );
}
