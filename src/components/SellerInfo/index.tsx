import { getInitState, setLocalData } from '@/utils';
import PhoneIcon from '@mui/icons-material/Phone';
import { useState } from 'react';
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
  const [image, setImage] = useState(getInitState<string>(STORE_IMAGE, IMAGE));
  const [name, setName] = useState(getInitState<string>(STORE_NAME, NAME));
  const [description, setDescription] = useState(getInitState<string>(STORE_DESCRIPTION, DESCRIPTION));
  const [phone, setPhone] = useState(getInitState<string>(STORE_PHONE, PHONE));

  return (
    <section>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <EditWrapper
            title="Edit image"
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
              title="Edit name"
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
            title="Edit description"
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
              title="Edit phone"
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
