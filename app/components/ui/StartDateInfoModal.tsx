import colors from '@/colors';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface StartDateInfoModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  variant?: 'info' | 'confirmation'; // 'info' for single button, 'confirmation' for two buttons
}

export default function StartDateInfoModal({ visible, onClose, onConfirm, variant = 'info' }: StartDateInfoModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Title */}
          <Text style={styles.title}>Başlangıç Tarihi Bilgisi</Text>

          {/* Informational Text */}
          <View style={styles.contentContainer}>
            <Text style={styles.infoText}>
              Abonelikler her zaman bir sonraki Pazartesi (haftalık için) veya ayın 1'inde (aylık için) başlar.
            </Text>
            <Text style={styles.infoText}>
              Gelecekteki bir güncellemede özel bir başlangıç tarihi seçebileceksiniz!
            </Text>
          </View>

          {/* Separator */}
          <View style={styles.separator} />

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            {variant === 'confirmation' ? (
              // Two buttons for confirmation variant
              <>
                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                  <Text style={styles.cancelButtonText}>İptal</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                  <Text style={styles.confirmButtonText}>Tamam</Text>
                </TouchableOpacity>
              </>
            ) : (
              // Single button for info variant
              <TouchableOpacity style={styles.singleButton} onPress={onConfirm}>
                <Text style={styles.singleButtonText}>Tamam</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: colors.gray,
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 320,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Sen_700Bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  contentContainer: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Sen_400Regular',
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 12,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Sen_400Regular',
    color: colors.text,
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Sen_400Regular',
    color: colors.primary,
  },
  singleButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  singleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Sen_400Regular',
    color: colors.background,
  },
});
