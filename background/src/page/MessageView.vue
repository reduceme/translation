<template>
  <div>
    <new-message></new-message>
    <message-list></message-list>
    <message-page></message-page>
  </div>
</template>

<script>
import MessageList from '../components/MessageList'
import NewMessage from '../components/NewMessage'
import MessagePage from '../components/MessagePage'
export default {
  components: {
    MessagePage,
    NewMessage,
    MessageList},
  name: 'message-view'
}
</script>

<style scoped></style>
