<template>
  <q-table
    title="Listado de colaboradores"
    :rows="users"
    :columns="columns"
    row-key="id"
    :loading="loading"
    :pagination="{ rowsPerPage: 10 }"
    :rows-per-page-options="[10, 20, 50]"
    flat
    bordered
    no-data-label="No hay usuarios para mostrar"
  >
    <template #body-cell-image="props">
      <q-td :props="props">
        <q-avatar size="45px">
          <img :src="props.row.image" />
        </q-avatar>
      </q-td>
    </template>

    <template #body-cell-actions="props">
      <q-td :props="props">
        <q-btn
          dense
          color="primary"
          icon="visibility"
          label="Detalle"
          @click="$emit('view-detail', props.row.id)"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
defineProps({
  users: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['view-detail'])

function fullName(user) {
  return `${user.firstName || ''} ${user.lastName || ''}`.trim()
}

const columns = [
  { name: 'image', label: 'Foto', field: 'image', align: 'center' },
  {
    name: 'fullName',
    label: 'Nombre completo',
    field: (row) => fullName(row),
    align: 'left',
    sortable: true,
  },
  { name: 'age', label: 'Edad', field: 'age', align: 'center', sortable: true },
  { name: 'gender', label: 'Género', field: 'gender', align: 'center', sortable: true },
  { name: 'email', label: 'Correo electrónico', field: 'email', align: 'left' },
  {
    name: 'company',
    label: 'Empresa',
    field: (row) => row.company?.name || '-',
    align: 'left',
    sortable: true,
  },
  {
    name: 'title',
    label: 'Cargo',
    field: (row) => row.company?.title || '-',
    align: 'left',
  },
  {
    name: 'city',
    label: 'Ciudad',
    field: (row) => row.address?.city || '-',
    align: 'left',
    sortable: true,
  },
  {
    name: 'country',
    label: 'País',
    field: (row) => row.address?.country || '-',
    align: 'left',
    sortable: true,
  },
  { name: 'actions', label: 'Acción', field: 'actions', align: 'center' },
]
</script>