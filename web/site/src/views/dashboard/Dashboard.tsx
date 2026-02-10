import { Content, DynamicTable } from 'common-lib';

export default function Dashboard() {
  return <Content>
    <DynamicTable
      selectable={true}
      singleSelection={true}
      keyTag="email"
      columns={[
        { key: 'name', label: 'Nombre', sortable: true },
        { key: 'email', label: 'Correo', sortable: true },
        { key: 'phone', label: 'Teléfono', render: val => <a href={`tel:${val}`}>{val}</a>, sortable: true }
      ]}
      data={[
        { name: 'Ana', email: 'ana@mail.com', phone: '123456789' },
        { name: 'Luis', email: 'luis@mail.com', phone: '987654321' }
      ]}
      onSelectionChange={(selected) => {
        console.log("Seleccionados:", selected);
      }}
    />

  </Content>
}
