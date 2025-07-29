import { useEffect } from 'react';
import { Select } from '@tc/design-ui';
import { handelGetCategoryList } from '@/services/api';

export default function List(props: {
  UserName: string;
  phoneNumber: number;
  hidden: boolean;
}) {
  const { UserName, phoneNumber, hidden } = props;

  useEffect(() => {
    handelGetCategoryList().then(res => {
      console.log(res);
    });
  }, []);

  return (
    <>
      <Select>
        <Select.Option value="1">test</Select.Option>
      </Select>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <span>{UserName}</span>
        <span>{phoneNumber}</span>
        <span>{hidden}</span>
      </div>
    </>
  );
}
